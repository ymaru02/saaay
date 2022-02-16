import state from "../module-account/state";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";

export function someMutation(state) {}

export function initData(state, data) {
  state.OPENVIDU_SERVER_URL = data.OPENVIDU_SERVER_URL;
  state.OPENVIDU_SERVER_SECRET = data.OPENVIDU_SERVER_SECRET;
  state.mySessionId = data.userName.value;
  state.myUserName = data.userName.value;
}

export function joinSession(state) {
  // --- Get an OpenVidu object ---
  state.OV = new OpenVidu();

  // --- Init a session ---
  state.session = state.OV.initSession();

  // --- Specify the actions when events take place in the session ---

  // On every new Stream received...
  state.session.on("streamCreated", ({ stream }) => {
    const subscriber = state.session.subscribe(stream);
    state.subscribers.push(subscriber);
  });

  // On every Stream destroyed...
  state.session.on("streamDestroyed", ({ stream }) => {
    const index = state.subscribers.indexOf(stream.streamManager, 0);
    if (index >= 0) {
      state.subscribers.splice(index, 1);
    }
  });

  // On every asynchronous exception...
  state.session.on("exception", ({ exception }) => {
    console.warn(exception);
  });
  // --- Connect to the session with a valid user token ---

  // 'getToken' method is simulating what your server-side should do.
  // 'token' parameter should be retrieved and returned by your own backend
  getToken(state, state.mySessionId).then((token) => {
    state.session
      .connect(token, { clientData: state.myUserName })
      .then(() => {
        // --- Get your own camera stream with the desired properties ---

        let publisher = state.OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        state.mainStreamManager = publisher;
        state.publisher = publisher;

        // --- Publish your stream ---

        state.session.publish(state.publisher);
      })
      .catch((error) => {
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  });

  window.addEventListener("beforeunload", state.leaveSession);
}

export function leaveSession(state) {
  // --- Leave the session by calling 'disconnect' method over the Session object ---
  if (state.session) state.session.disconnect();

  state.session = undefined;
  state.mainStreamManager = undefined;
  state.publisher = undefined;
  state.subscribers = [];
  state.OV = undefined;

  window.removeEventListener("beforeunload", state.leaveSession);
}

export function updateMainVideoStreamManager(state, stream) {
  if (state.mainStreamManager === stream) return;
  state.mainStreamManager = stream;
}

/**
 * --------------------------
 * SERVER-SIDE RESPONSIBILITY
 * --------------------------
 * These methods retrieve the mandatory user token from OpenVidu Server.
 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
 * the API REST, openvidu-java-client or openvidu-node-client):
 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */

function getToken(state, mySessionId) {
  return createSession(state, mySessionId).then((sessionId) =>
    createToken(state, sessionId)
  );
}

// See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-session
function createSession(state, sessionId) {
  return new Promise((resolve, reject) => {
    console.log("what:");
    console.log(state);
    axios
      .post(
        `${state.OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        JSON.stringify({
          customSessionId: sessionId,
        }),
        {
          auth: {
            username: "OPENVIDUAPP",
            password: state.OPENVIDU_SERVER_SECRET,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => resolve(data.id))
      .catch((error) => {
        console.log("aaa");
        if (error.response.status === 409) {
          resolve(sessionId);
        } else {
          console.warn(
            `No connection to OpenVidu Server. This may be a certificate error at ${state.OPENVIDU_SERVER_URL}`
          );
          if (
            window.confirm(
              `No connection to OpenVidu Server. This may be a certificate error at ${state.OPENVIDU_SERVER_URL}\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${state.OPENVIDU_SERVER_URL}"`
            )
          ) {
            location.assign(`${state.OPENVIDU_SERVER_URL}/accept-certificate`);
          }
          reject(error.response);
        }
      });
  });
}

// See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-connection
function createToken(state, sessionId) {
  return new Promise((resolve, reject) => {
    console.log("aaaa");
    axios
      .post(
        `${state.OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          auth: {
            username: "OPENVIDUAPP",
            password: state.OPENVIDU_SERVER_SECRET,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => resolve(data.token))
      .catch((error) => reject(error.response));
  });
}
