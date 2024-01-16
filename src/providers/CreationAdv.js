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
    location: {
      address: null,
      canGoToHome: null,
      canReceive: null,
      lat: null,
      lon: null,
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
