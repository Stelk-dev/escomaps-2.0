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
  console.log("HavePositionPermission: ");

  const { state } = await navigator.permissions.query({
    name: "geolocation",
  });

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

export { UserLocation, HavePositionPermission, GetUserPosition };
