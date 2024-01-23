import { atom } from "recoil";

const SearchOptions = atom({
  key: "SearchOptions",
  default: {
    findSex: "Donna",
    findWhere: "Milano",
  },
});

const AdsFilters = atom({
  key: "AdsFilters",
  default: {
    filters: [],
  },
});

export { SearchOptions, AdsFilters };
