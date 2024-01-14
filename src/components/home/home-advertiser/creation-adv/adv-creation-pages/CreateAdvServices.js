import React from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";

export default function CreateAdvServices({ onContinue, onBack }) {
  return (
    <div>
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
