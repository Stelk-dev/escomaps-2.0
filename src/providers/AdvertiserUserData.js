import { atom } from "recoil";
import { GetData, SetData, UpdateData } from "../services/Database";

// Provider for saving location
const CurrentUserAdvertiser = atom({
  key: "CurrentUserAdvertiser",
  default: {
    uid: "",
    name: "",
    lastName: "",
    age: "",
    email: "",
    prefix: "",
    phoneNumber: "",
    adsIds: [],
    credits: 0,
    isOnline: false,
    identityVerified: false,
    emailVerified: false,
  },
});

async function GetAdvertiserData(idUser) {
  return await GetData("advertisers", idUser);
}

async function SetAdvertiserData(idUser, newData) {
  return await SetData("advertisers", idUser, newData);
}

async function UpdateAdvertiserData(idUser, newData) {
  return await UpdateData("advertisers", idUser, newData);
}

export {
  CurrentUserAdvertiser,
  GetAdvertiserData,
  SetAdvertiserData,
  UpdateAdvertiserData,
};
