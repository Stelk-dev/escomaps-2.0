import { atom } from "recoil";
import { GetData, SetData, UpdateData, usersKey } from "../services/Database";

// Provider for user
const CurrentUser = atom({
  key: "CurrentUser",
  default: {
    uid: "",
    name: "",
    email: "",
    favouritesAds: [],
  },
});

async function GetUserData(idUser) {
  return await GetData(usersKey, idUser);
}

async function SetUserData(idUser, newData) {
  return await SetData(usersKey, idUser, newData);
}

async function UpdateUserData(idUser, newData) {
  return await UpdateData(usersKey, idUser, newData);
}

export { CurrentUser, GetUserData, SetUserData, UpdateUserData };
