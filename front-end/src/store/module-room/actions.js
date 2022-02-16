import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export function getRoomList({ commit }) {
  api.get("room/list").then((response) => {
    commit("GET_ROOMLIST", response.data);
  });
}

export function createRoom({ commit }, data) {
  //url 주소 , 데이터객체
  api.post(`room/`, data, {}).then(() => {
    console.log("프론트에서 데이터 보냄");
  });
}
