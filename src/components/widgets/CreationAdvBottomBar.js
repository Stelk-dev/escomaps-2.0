import { CircularProgress } from "@mui/material";
import React from "react";

export default function CreationAdvBottomBar({
  onContinue,
  isDisabled,
  isPubblish = false,
  isLoading = false,
  onBack,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "24px",
      }}
    >
      <br />
      <button
        onClick={onContinue}
        type="submit"
        disabled={isLoading || isDisabled}
        style={{
          width: "100%",
          border: "none",
          padding: "12px",
          borderRadius: "4px",
          fontWeight: "500",
          color: !isDisabled && !isLoading ? "white" : "#FFFFFF66",
          backgroundColor: !isDisabled && !isLoading ? "#B02D23" : "#FFFFFF33",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress style={{ color: "white" }} size={24} />
        ) : isPubblish ? (
          "Pubblica"
        ) : (
          "Continua"
        )}
      </button>
      <button
        onClick={onBack}
        style={{
          marginTop: "16px",
          border: "none",
          backgroundColor: "transparent",
          color: "white",
          fontSize: "15px",
        }}
      >
        Indietro
      </button>
    </div>
  );
}
