import { GetData, GetDocs, advertisementsKey } from "../services/Database";

const GetAds = GetDocs(advertisementsKey);

const GetAdvData = (idAdv) => GetData(advertisementsKey, idAdv);

async function SearchAdsInDatabase(query) {
  const t = query.toLowerCase();
  return GetAds.then((v) => {
    return v.docs
      .map((a) => a.data())
      .filter((e) => {
        return (
          e.name.toLowerCase().includes(t) ||
          e.categories.map((e) => e.toLowerCase()).includes(t) ||
          e.services.map((e) => e.toLowerCase()).includes(t) ||
          e.locationData.address.toLowerCase().includes(t) ||
          e.phoneNumber.toLowerCase().includes(t) ||
          e.title.toLowerCase().includes(t) ||
          e.description.toLowerCase().includes(t)
        );
      });
  });
}

export { GetAds, GetAdvData, SearchAdsInDatabase };
