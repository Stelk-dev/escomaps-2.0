import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";

export default function ReviewAdv({ onContinue, onBack }) {
  const [advData] = useRecoilState(CreationAdvAtom);

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

      <div>
        {advData.name} {advData.instagram}
      </div>

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
