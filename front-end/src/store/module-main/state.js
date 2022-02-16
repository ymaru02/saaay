export default function () {
  return {
    //

    OPENVIDU_SERVER_URL: "",
    OPENVIDU_SERVER_SECRET: "",

    OV: undefined,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],

    mySessionId: "",
    myUserName: "",
  };
}
