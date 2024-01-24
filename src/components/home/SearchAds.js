import React, { useState } from "react";
import AdsList from "./widgets/AdsList";
import { useLocation } from "react-router-dom";
import SelectCityLocationModal from "./widgets/SelectCityLocationModal";

export default function SearchAds() {
  const location = useLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "12px",
        marginRight: "12px",
      }}
    >
      <div
        style={{
          marginTop: "80px",
          maxWidth: "1324px",
          width: "100%",
        }}
      >
        {/* Titles */}
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {query.substring(0, 1).toUpperCase() + query.substring(1)} in Milano
          </h1>
          <div style={{ color: "grey", fontSize: "14px" }}>
            Vuoi cercare in una zona diversa?{" "}
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "red",
                padding: "0px",
                textDecoration: "underline",
              }}
              onClick={() => setShowLocationModal(true)}
            >
              {"clicca qui"}
            </button>
          </div>
        </div>

        <div style={{ height: "8px" }} />

        <br />

        {/* Ads list */}
        <AdsList ads={[]} />

        <div style={{ height: "40px" }} />
      </div>

      <SelectCityLocationModal
        open={showLocationModal}
        onSelect={(newPos) => {
          console.log(newPos);
        }}
        onClose={() => setShowLocationModal(false)}
      />
    </div>
  );
}
