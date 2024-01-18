import { atom } from "recoil";

// Provider for saving location
const UserLocation = atom({
  key: "UserLocation",
  default: {
    hasPermission: false,
    latitude: null,
    longitude: null,
  },
});

// [bool] Check if permission are enabled
async function HavePositionPermission() {
  const { state } = await navigator.permissions.query({
    name: "geolocation",
  });
  console.log("HavePositionPermission: " + state === "granted");

  return state === "granted";
}

// [void] Get position from geolocalisation
function GetUserPosition(onSuccess, onError) {
  console.log("GetUserPosition: ");

  navigator.geolocation.getCurrentPosition(
    (position) => onSuccess(position),
    (error) => onError(error)
  );
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
  HavePositionPermission,
  GetUserPosition,
};
