import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function CreateAdvSocials({ onContinue, onBack }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Carica i tuoi social
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Carica i link ai tuoi profili socials!
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
