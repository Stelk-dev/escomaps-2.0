import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetData, advertisementsKey } from "../../../services/Database";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  GetDistanceFromAdv,
  UserLocation,
} from "../../../providers/UserLocation";

export default function AdvItem({
  preselectedADV = null,
  advId,
  isFromAdvertiser = false,
}) {
  const [adv, setAdv] = useState({
    idAdv: null,
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
    dateExpire: null,
    lastDateOfBoostActivated: null,
  });

  const [userPosition] = useRecoilState(UserLocation);
  const ShowDistance = () => !isFromAdvertiser;

  const ExpireDate = () => {
    const date = new Date(adv.dateExpire.seconds * 1000);
    const monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];

    return (
      date.getDate() +
      " " +
      monthName +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };

  useEffect(() => {
    if (preselectedADV === null)
      GetData(advertisementsKey, advId).then((resp) => {
        setAdv(resp);
      });
    else setAdv(preselectedADV);

    return () => {};
  }, [advId, preselectedADV]);

  return adv.idAdv === null ? (
    <div
      className="grid-item"
      style={{
        backgroundColor: "grey",
        borderRadius: "8px",
        width: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ color: "white" }} />
    </div>
  ) : (
    <Link
      key={adv.idAdv}
      to={{
        pathname: "/adv-detail/" + adv.idAdv.split("-")[0],
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

        {/* Data */}
        <div key={adv.uidAdvertiser} className="grid-item">
          <img
            src={adv.photos[0]}
            className="grid-item-image"
            alt="escort-label"
            style={{ height: !ShowDistance() && "80%" }}
          />

          {/* Description */}
          <div className="grid-item-description">
            {/* Data */}
            <h5 style={{ fontSize: "16px", marginBottom: "2px" }}>
              {adv.name}, {adv.age}
            </h5>

            {/* Distance */}
            {ShowDistance() ? (
              <p style={{ fontSize: "11px", color: "grey" }}>
                {userPosition.hasPermission
                  ? GetDistanceFromAdv({
                      userLatitude: userPosition.latitude,
                      userLongitude: userPosition.longitude,
                      advLatitude: adv.locationData.lat,
                      advLongitude: adv.locationData.lon,
                    }).toString() + " km da te"
                  : ""}
              </p>
            ) : (
              <p style={{ fontSize: "11px", color: "grey" }}>
                Data di scadenza:
                <br />
                {ExpireDate()}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
