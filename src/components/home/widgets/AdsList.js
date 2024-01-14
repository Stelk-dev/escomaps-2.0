import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { UserLocation } from "../../../providers/UserLocation";
import { useRecoilState } from "recoil";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import AdvItem from "./AdvItem";

export default function AdsList({ ads, loading }) {
  const [userPosition] = useRecoilState(UserLocation);

  const getAge = (birthDate) => {
    const date1 = new Date(birthDate);
    const date2 = new Date();

    const diffYears = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  };

  const getImagePath = ({ image, idAdvertiser }) => {
    if (image.includes("http")) return image;
    return "404";
  };

  const GetDistance = ({ advLatitude, advLongitude }) => {
    const calculateDistance = () => {
      const lat1 = userPosition.latitude;
      const lon1 = userPosition.longitude;
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

  return (
    <div>
      {/* Loading */}
      {loading && (
        <div className="grid-container">
          {Array.from({ length: 9 }).map((i) => (
            <div
              className="grid-item"
              key={i}
              style={{
                backgroundColor: "grey",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress style={{ color: "white" }} />
            </div>
          ))}
        </div>
      )}

      {/* Grid view list */}
      <div className="grid-container">
        {ads.map((a) => {
          return <AdvItem preselectedADV={a} />;
        })}
      </div>
    </div>
  );
}
