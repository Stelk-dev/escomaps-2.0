import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CreditsToShow,
  CurrentUserAdvertiser,
} from "../../../providers/AdvertiserUserData";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import AdvItem from "../widgets/AdvItem";
import { CircularProgress } from "@mui/material";

export default function AdvertiserAds() {
  const [user] = useRecoilState(CurrentUserAdvertiser);
  const credits = useRecoilValue(CreditsToShow);

  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px",
      }}
    >
      <h1 style={{ fontWeight: "600", fontSize: "24px", textAlign: "center" }}>
        Ciao {user.name}, qui puoi vedere tutti i tuoi annunci
      </h1>
      <div style={{ height: "16px" }} />
      <div style={{ fontSize: "16px" }}>
        I tuoi crediti: <strong style={{ color: "#BA68C8" }}>{credits}</strong>
      </div>
      <div style={{ height: "2px" }} />
      <Link to="/buy-credits" style={{ color: "#BA68C8", fontSize: "13px" }}>
        Aggiungi crediti ora
      </Link>

      {/* List Advertiser ads */}
      <div style={{ marginTop: "32px" }}>
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
              <AdvItem advId={e} key={e} showDistance={false} />
            ))}
          </div>
        )}
      </div>

      <button className="floating-action-button" onClick={() => navigate("")}>
        <IoMdAdd />
      </button>
    </div>
  );
}
