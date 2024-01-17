import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AdvItem from "./AdvItem";

export default function AdsList({ ads, loading }) {
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
          return <AdvItem preselectedADV={a} key={a.idAdv} />;
        })}
      </div>
    </div>
  );
}
