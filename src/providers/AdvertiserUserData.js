import { atom, selector } from "recoil";
import {
  GetData,
  SetData,
  UpdateData,
  advertisersKey,
} from "../services/Database";

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
    adsIds: null,
    credits: 0,
    isOnline: false,
    identityVerified: false,
    emailVerified: false,
  },
});

const CreditsToShow = selector({
  key: "CreditsToShow",
  get: ({ get }) => {
    const credits = get(CurrentUserAdvertiser);
    const formatter = new Intl.NumberFormat("it-IT", {
      style: "decimal",
    });
    return formatter.format(credits.credits) + " 💎";
  },
});

async function GetAdvertiserData(idUser) {
  return await GetData(advertisersKey, idUser);
}

async function SetAdvertiserData(idUser, newData) {
  return await SetData(advertisersKey, idUser, newData);
}

async function UpdateAdvertiserData(idUser, newData) {
  return await UpdateData(advertisersKey, idUser, newData);
}

export {
  CurrentUserAdvertiser,
  CreditsToShow,
  GetAdvertiserData,
  SetAdvertiserData,
  UpdateAdvertiserData,
};
