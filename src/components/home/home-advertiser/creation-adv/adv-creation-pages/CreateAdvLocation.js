import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function CreateAdvLocation({ advData, onContinue, onBack }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Posizione
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Seleziona la zona del tuo annuncio
      </div>
      <br />

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue();
        }}
        onBack={onBack}
      />
    </div>
  );
}
