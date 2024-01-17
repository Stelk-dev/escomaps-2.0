import { atom } from "recoil";

const CreationAdvAtom = atom({
  key: "CreationAdvAtom",
  default: {
    packageSelected: { totCredits: null, hoursLeft: null },
    name: null,
    age: null,
    gender: null,
    phoneNumberPrefix: null,
    phoneNumber: null,
    waNumberPrefix: null,
    waNumber: null,
    tgNumberPrefix: null,
    tgNumber: null,
    locationData: {
      address: null,
      canGoToHomes: null,
      canReceiveAtHome: null,
      lat: 0,
      lon: 0,
      locationPublic: null,
    },
    categories: [],
    services: [],
    instagram: null,
    onlyfans: null,
    facebook: null,
    tiktok: null,
    photos: [],
    title: null,
    description: null,
    datePublished: null,
    lastDateOfBoostActivated: null,
    dateExpire: null,
    idAdv: null,
    idAdvertiser: null,
    isDisabled: false,
  },
});

export { CreationAdvAtom };
