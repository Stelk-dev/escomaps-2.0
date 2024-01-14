import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessScreen({ title, isBuyFlow }) {
  const navigate = useNavigate();

  let location = useLocation();
  console.log();

  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "100vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
          {title}
        </h1>
        <div
          style={{
            marginTop: "12px",
            color: "#FFFFFFEE",
            fontWeight: "200",
            fontSize: 18,
            padding: "0px 32px",
            textAlign: "center",
          }}
        >
          {isBuyFlow && (
            <div style={{ color: "white", textAlign: "center" }}>
              Il tuo ordine di{" "}
              <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
                {location.state.totalCredits} 💎 crediti
              </strong>{" "}
              è stato processato correttamente
            </div>
          )}

          <div style={{ height: "32px" }} />
          <button
            onClick={() => navigate("/advertiser/ads")}
            type="submit"
            style={{
              width: "100%",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              fontWeight: "500",
              color: "white",
              backgroundColor: "#B02D23",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Torna alla home
          </button>
        </div>
      </div>
    </div>
  );
}
