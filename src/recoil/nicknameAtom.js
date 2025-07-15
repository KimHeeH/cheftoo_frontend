import { atom, selector } from "recoil";
import axios from "axios";

export const nicknameState = atom({
  key: "nicknameState",
  default: localStorage.getItem("nickname") || null, // 초기값을 localStorage에서
});
