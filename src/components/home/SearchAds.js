import React from "react";
import AdsList from "./widgets/AdsList";
import { useLocation } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import "./css/SearchAds.css";

export default function SearchAds() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "80px",
          padding: "0px 12px",
          maxWidth: "1300px",
          width: "100%",
        }}
      >
        {/* Titles */}
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {query.substring(0, 1).toUpperCase() + query.substring(1)}
          </h1>
          <div style={{ color: "grey", fontSize: "14px" }}>
            Vuoi cercare in una zona diversa?{" "}
            <a href="google.com" style={{ color: "red" }}>
              clicca qui
            </a>
          </div>
        </div>

        <div style={{ height: "8px" }} />

        {/* Filter button */}
        <button id="filter-button" onClick={() => {}}>
          <BsFilter style={{ marginRight: "6px", fontSize: "24px" }} />
          <div style={{ fontSize: "14px" }}>Filtri</div>
        </button>

        <br />

        {/* Ads list */}
        <AdsList ads={[]} />

        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
