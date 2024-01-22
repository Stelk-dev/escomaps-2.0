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
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

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

  const [indexPhoto, setIndexPhoto] = useState(0);
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
        width: "250px",
        backgroundColor: "grey",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
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
            zIndex: "1",
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

        {/* Adv item */}
        <div className="grid-item">
          <div className="grid-item-title" style={{ position: "relative" }}>
            <div
              className="grid-arrow-icon"
              style={{
                left: 0,
                background: "linear-gradient(to right, #00000066, #FFFFFF00)",
              }}
            >
              <FaArrowCircleLeft
                onClick={(e) => {
                  e.preventDefault();
                  setIndexPhoto(
                    indexPhoto === 0 ? adv.photos.length - 1 : indexPhoto - 1
                  );
                }}
              />
            </div>
            <div
              className="grid-arrow-icon"
              style={{
                right: 0,
                background: "linear-gradient(to left, #00000066, #FFFFFF00)",
              }}
            >
              <FaArrowCircleRight
                onClick={(e) => {
                  e.preventDefault();
                  setIndexPhoto(
                    indexPhoto === adv.photos.length - 1 ? 0 : indexPhoto + 1
                  );
                }}
              />
            </div>

            {/* Image */}
            <img
              src={adv.photos[indexPhoto]}
              alt="escort-label"
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Description */}
          <div className="grid-item-description">
            {/* Name, age */}
            <div>
              {adv.name}, {adv.age}
            </div>

            {/* Distance */}
            {ShowDistance() ? (
              <div style={{ fontSize: "12px", color: "grey" }}>
                {userPosition.hasPermission
                  ? GetDistanceFromAdv({
                      userLatitude: userPosition.latitude,
                      userLongitude: userPosition.longitude,
                      advLatitude: adv.locationData.lat,
                      advLongitude: adv.locationData.lon,
                    }).toString() + " km da te"
                  : ""}
              </div>
            ) : (
              <div style={{ fontSize: "11px", color: "grey" }}>
                Data di scadenza:
                <br />
                {ExpireDate()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

//
// {
//   /* <Link
// >
//   <div style={{ position: "relative" }}>
//     {/* Sex symbol */
// }

// {
//   /* Adv item */
// }
// <div
//   style={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }}
// >
//   <div className="grid-item">
// <div className="grid-item-image">
// {
/* Arrows
          <div
            className="grid-arrow-icon"
            style={{
              left: 0,
              background: "linear-gradient(to right, #00000066, #FFFFFF00)",
            }}
          >
            <FaArrowCircleLeft
              onClick={() =>
                setIndexPhoto(
                  indexPhoto === 0 ? adv.photos.length - 1 : indexPhoto - 1
                )
              }
            />
          </div>
          <div
            className="grid-arrow-icon"
            style={{
              right: 0,
              background: "linear-gradient(to left, #00000066, #FFFFFF00)",
            }}
          >
            <FaArrowCircleRight
              onClick={() =>
                setIndexPhoto(
                  indexPhoto === adv.photos.length - 1 ? 0 : indexPhoto + 1
                )
              }
            />
          </div> */
// }

// {
//   /* Image */
// }
//       <img
//         src={adv.photos[indexPhoto]}
//         alt="escort-label"
//         width={"100%"}
//         height={"100%"}
//         style={{ objectFit: "cover" }}
//       />
//     </div>

//     {/* Name, age */}
//     <div className="grid-item-description">
//       {/* Data */}
//       <h5 style={{ fontSize: "18px" }}>
//         {adv.name}, {adv.age}
//       </h5>

//       {/* Distance */}
//       {ShowDistance() ? (
//         <div style={{ fontSize: "12px", color: "grey" }}>
//           {userPosition.hasPermission
//             ? GetDistanceFromAdv({
//                 userLatitude: userPosition.latitude,
//                 userLongitude: userPosition.longitude,
//                 advLatitude: adv.locationData.lat,
//                 advLongitude: adv.locationData.lon,
//               }).toString() + " km da te"
//             : ""}
//         </div>
//       ) : (
//         <div style={{ fontSize: "11px", color: "grey" }}>
//           Data di scadenza:
//           <br />
//           {ExpireDate()}
//         </div>
//       )}
//     </div>
//   </div>
// </div>
// </div>
