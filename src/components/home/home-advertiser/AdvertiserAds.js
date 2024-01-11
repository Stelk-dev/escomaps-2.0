import React from "react";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

export default function AdvertiserAds() {
  const [user] = useRecoilState(CurrentUserAdvertiser);
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
        I tuoi crediti:{" "}
        <strong style={{ color: "#BA68C8" }}>{user.credits} 💎</strong>
      </div>
      <div style={{ height: "2px" }} />
      <Link to="" style={{ color: "#BA68C8", fontSize: "13px" }}>
        Aggiungi crediti ora
      </Link>

      {/* List Advertiser ads */}
      <div style={{ marginTop: "8px" }}>
        {user.adsIds.length === 0 ? (
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
          <div></div>
        )}
      </div>

      <button className="floating-action-button" onClick={() => navigate("")}>
        <IoMdAdd />
      </button>
    </div>
  );
}
