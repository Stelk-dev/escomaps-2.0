import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";
import AdvDetailView from "../../../../adv/AdvDetailView";

export default function ReviewAdv({ onContinue, onBack }) {
  const [advData] = useRecoilState(CreationAdvAtom);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Il tuo annuncio è pronto!
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Assicurati che i dati inseriti siano corretti e clicca su "Pubblica" per
        pubblicarlo. <br /> Ecco come apparirà nella home:
      </div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "650px",
            border: "2px solid white",
            borderRadius: "16px",
            overflowY: "auto",
          }}
        >
          <AdvDetailView
            defaultAdvValue={advData}
            defaultDistanceValue={"1.2"}
            isFromEditOrCreation={true}
          />
        </div>
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
