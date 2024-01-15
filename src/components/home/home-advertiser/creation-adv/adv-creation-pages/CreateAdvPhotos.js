import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function CreateAdvPhotos({ onContinue, onBack }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Carica foto
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Scegli le tue foto migliori da caricare! (minimo 3 foto)
      </div>
      <br />

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({});
        }}
        onBack={onBack}
      />
    </div>
  );
}
