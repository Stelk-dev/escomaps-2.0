import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetData, advertisementsKey } from "../../../services/Database";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import { CircularProgress } from "@mui/material";

export default function AdvItemStream({ advId }) {
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
    instagramLink: "",
    tikTokLink: "",
    onlyfansLink: "",
    twitterLink: "",
    facebookLink: "",
    photos: [],
    title: "",
    description: "",
    isDisabled: false,
    showReviews: true,
    reviews: [],
    verifiedStatus: -1,
  });

  useEffect(() => {
    GetData(advertisementsKey, advId).then((resp) => {
      console.log(resp);
      setAdv(resp);
    });

    return () => {};
  }, [advId]);

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
            <h5 style={{ fontSize: "14px", marginBottom: "2px" }}>
              {adv.name}, {adv.age}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
