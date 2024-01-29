import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CreditsToShow,
  CurrentUserAdvertiser,
} from "../../../providers/AdvertiserUserData";
import { Link, useNavigate } from "react-router-dom";
import AdvItem from "../widgets/AdvItem";
import { CircularProgress } from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";

export default function AdvertiserAds() {
  const [user] = useRecoilState(CurrentUserAdvertiser);
  const credits = useRecoilValue(CreditsToShow);

  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: "60px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 12px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          style={{ fontWeight: "600", fontSize: "24px", textAlign: "center" }}
        >
          Ciao {user.name}, qui puoi vedere tutti i tuoi annunci
        </h1>
        <div style={{ height: "16px" }} />
        <div style={{ fontSize: "16px" }}>
          I tuoi crediti:{" "}
          <strong style={{ color: "#BA68C8" }}>{credits}</strong>
        </div>
        <div style={{ height: "2px" }} />
        <Link to="/buy-credits" style={{ color: "#BA68C8", fontSize: "13px" }}>
          Aggiungi crediti ora
        </Link>

        {/* List Advertiser ads */}
        <div style={{ marginTop: "32px", width: "100%" }}>
          {user.adsIds === null ? (
            <CircularProgress style={{ color: "white" }} />
          ) : user.adsIds.length === 0 ? (
            <div
              style={{
                display: "flex",
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
                color: "grey",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              <p>
                Non hai annunci pubblicati.
                <br />
                Inizia a pubblicare cliccando il{" "}
                <strong style={{ color: "white" }}>"+"</strong>
              </p>
            </div>
          ) : (
            <div className="grid-container">
              {user.adsIds.map((e, i) => (
                <AdvItem advId={e} key={e} isFromAdvertiser={true} />
              ))}
            </div>
          )}
        </div>

        <button
          className="floating-action-button"
          onClick={() => navigate("/create-adv")}
        >
          <IoMdAddCircle fontSize={"28px"} style={{ marginRight: "8px" }} />
          <div style={{ fontSize: "18px" }}>Crea annuncio</div>
        </button>
      </div>
    </div>
  );
}
