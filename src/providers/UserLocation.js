import { atom } from "recoil";

// Provider for saving location
const UserLocation = atom({
  key: "UserLocation",
  default: {
    city: "",
    lat: null,
    lon: null,
    regionName: "",
    zip: "",
  },
});

async function GetIPData() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function GetPositionFromIP(ip) {
  try {
    const response = await fetch(
      "https://pro.ip-api.com/json/" + ip + "?key=oKx3b50wPDTNzw4"
    );
    const _j = await response.json();
    console.log(_j);

    return _j;
  } catch (error) {
    return null;
  }
}

// Get position full function
async function GetUserPosition() {
  console.log("GetUserPosition");
  const r = await GetIPData();
  console.log(r.ip);

  // Get Position from IP
  return GetPositionFromIP(r.ip);
}

// [double] Get distance from adv
const GetDistanceFromAdv = ({
  userLatitude,
  userLongitude,
  advLatitude,
  advLongitude,
}) => {
  const calculateDistance = () => {
    const lat1 = userLatitude;
    const lon1 = userLongitude;
    const lat2 = advLatitude;
    const lon2 = advLongitude;
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const distance = calculateDistance(advLatitude, advLongitude).toFixed(2);

  return distance;
};

export {
  UserLocation,
  GetDistanceFromAdv,
  GetUserPosition,
  GetIPData,
  GetPositionFromIP,
};
