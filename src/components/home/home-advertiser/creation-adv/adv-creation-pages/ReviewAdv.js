import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function ReviewAdv({ advData, onContinue, onBack }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Il tuo annuncio è pronto!
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Assicurati che i dati inseriti siano corretti e clicca su "Pubblica" per
        pubblicarlo. Ecco come apparirà sulla home:
      </div>
      <br />

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue();
        }}
        isPubblish={true}
        onBack={onBack}
      />
    </div>
  );
}
