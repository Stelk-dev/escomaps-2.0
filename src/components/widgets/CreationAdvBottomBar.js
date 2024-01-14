import React from "react";

export default function CreationAdvBottomBar({
  onContinue,
  isDisabled,
  onBack,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <br />
      <button
        onClick={onContinue}
        type="submit"
        disabled={isDisabled}
        style={{
          width: "100%",
          border: "none",
          padding: "12px",
          borderRadius: "4px",
          fontWeight: "500",
          color: !isDisabled ? "white" : "#FFFFFF66",
          backgroundColor: !isDisabled ? "#B02D23" : "#FFFFFF33",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Continua
      </button>
      <button
        onClick={onBack}
        style={{
          marginTop: "8px",
          border: "none",
          backgroundColor: "transparent",
          color: "#AAAAAA",
          fontSize: "15px",
        }}
      >
        Indietro
      </button>
    </div>
  );
}
