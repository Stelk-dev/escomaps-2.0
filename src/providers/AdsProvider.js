import { GetData, GetDocs, advertisementsKey } from "../services/Database";

const GetAds = GetDocs(advertisementsKey);

const GetAdvData = (idAdv) => GetData(advertisementsKey, idAdv);

export { GetAds, GetAdvData };
