import React, { useEffect, useState } from "react";
import AdsList from "./widgets/AdsList";
import { useLocation } from "react-router-dom";
import SelectCityLocationModal from "./widgets/SelectCityLocationModal";
import { GetAds, SearchAdsInDatabase } from "../../providers/AdsProvider";
import { CircularProgress } from "@mui/material";

export default function SearchAds() {
  const location = useLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const [ads, setAds] = useState(null);

  useEffect(() => {
    console.log("SearchAdsInDatabase");
    SearchAdsInDatabase(query).then((v) => {
      if (v.length === 0)
        GetAds.then((oldAds) => {
          const data = oldAds.docs.map((a) => a.data());
          setAds(data);
        });
      else setAds(v);
    });
  }, [query]);

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
        <div style={{ marginBottom: "12px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {query.substring(0, 1).toUpperCase() + query.substring(1)}
          </h1>
          <div style={{ color: "grey", fontSize: "14px" }}>
            Più di <strong style={{ color: "#B02D23" }}>{ads.length}</strong>{" "}
            risultati
          </div>
        </div>

        {/* Ads list */}
        {ads === null ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ color: "white" }} />
          </div>
        ) : (
          <AdsList ads={ads} />
        )}

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
