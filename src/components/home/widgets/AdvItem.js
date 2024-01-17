import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetData, advertisementsKey } from "../../../services/Database";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import { UserLocation } from "../../../providers/UserLocation";

export default function AdvItem({
  preselectedADV = null,
  advId,
  isFromAdvertiser = false,
}) {
  const [adv, setAdv] = useState({
    idADV: null,
    uidAdvertiser: "",
    name: "",
    age: "",
    gender: -1,
    phoneNumber: "",
    whatsapp: "",
    telegram: "",
    categories: [],
    services: [],
    instagram: "",
    onlyfans: "",
    facebook: "",
    tiktok: "",
    photos: [],
    title: "",
    description: "",
    isDisabled: false,
    datePublished: null,
    lastDateOfBoostActivated: null,
  });

  const getAge = (birthDate) => {
    const date1 = new Date(birthDate);
    const date2 = new Date();

    const diffYears = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  };

  const [userPosition] = useRecoilState(UserLocation);
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

  useEffect(() => {
    if (preselectedADV === null)
      GetData(advertisementsKey, advId).then((resp) => {
        setAdv(resp);
      });
    else setAdv(preselectedADV);

    return () => {};
  }, [advId, preselectedADV]);

  return adv.idADV === null ? (
    <div
      style={{
        backgroundColor: "grey",
        borderRadius: "8px",
        width: "100%",
        height: "230px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ color: "white" }} />
    </div>
  ) : (
    <Link
      key={adv.idADV}
      to={{
        pathname: "/adv-detail/" + adv.idADV,
      }}
      state={{ adv: adv }}
      style={{
        color: "white",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          zIndex: "-1",
          width: "100%",
        }}
      >
        {/* Sex symbol */}
        <div
          style={{
            top: "-10px",
            left: "-6px",
            position: "absolute",
            fontSize: "16px",
            height: "32px",
            width: "32px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            backgroundColor: "black",
            borderRadius: "100%",
            color:
              adv.gender === 0
                ? "lightblue"
                : adv.gender === 1
                ? "pink"
                : "red",
          }}
        >
          {adv.gender === 0 ? (
            <IoMdMale />
          ) : adv.gender === 1 ? (
            <IoMdFemale />
          ) : (
            <IoMdTransgender />
          )}
        </div>
        <div key={adv.uidAdvertiser} className="grid-item">
          {/* Image */}
          <img
            src={adv.photos[0]}
            className="grid-item-image"
            alt="escort-label"
          />

          {/* Description */}
          <div className="grid-item-description">
            {/* Data */}
            <h5 style={{ fontSize: "16px", marginBottom: "2px" }}>
              {adv.name}, {getAge(adv.birthDate)}
            </h5>

            {/* Distance */}
            {!isFromAdvertiser && userPosition.hasPermission ? (
              <p style={{ fontSize: "11px", color: "grey" }}>
                {GetDistance({
                  advLatitude: adv.locationData.lat,
                  advLongitude: adv.locationData.lon,
                })}{" "}
                km da te
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
