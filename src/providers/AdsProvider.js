import { GetDocs, advertisementsKey } from "../services/Database";

const GetAds = GetDocs(advertisementsKey);

export { GetAds };
