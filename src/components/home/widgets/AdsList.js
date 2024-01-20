import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AdvItem from "./AdvItem";

export default function AdsList({ ads, loading }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Loading */}
      {loading && (
        <div className="grid-container">
          {Array.from({ length: 9 }).map((i, key) => (
            <div
              className="grid-item"
              key={key}
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
