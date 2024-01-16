import React, { useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { Categories, Services } from "../../../../../constants/ValueConstants";

export default function CreateAdvServices({ advData, onContinue, onBack }) {
  const [data, setData] = useState({
    categories: advData.categories,
    services: advData.services,
  });

  const BoxSelectable = ({ title, isSelected = false, onTap }) => {
    return (
      <div
        className={isSelected ? "box-selectable selected" : "box-selectable"}
        onClick={() => onTap(isSelected)}
      >
        {title}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Categorie
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Seleziona le categorie del tuo annuncio (massimo 3)
      </div>
      <br />

      <div className="div-box-selection">
        {Categories.map((e) => (
          <BoxSelectable
            key={e}
            title={e}
            isSelected={data.categories.filter((v) => v === e).length > 0}
            onTap={(isSelected) => {
              if (isSelected)
                setData({
                  ...data,
                  categories: data.categories.filter((v) => v !== e),
                });
              else {
                if (data.categories.length === 3) return;

                setData({ ...data, categories: [...data.categories, e] });
              }
            }}
          />
        ))}
      </div>
      <br />

      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Servizi
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Seleziona i servizi che offri (opzionale)
      </div>
      <br />

      <div className="div-box-selection">
        {Services.map((e) => (
          <BoxSelectable
            key={e}
            title={e}
            isSelected={data.services.filter((v) => v === e).length > 0}
            onTap={(isSelected) => {
              if (isSelected)
                setData({
                  ...data,
                  services: data.services.filter((v) => v !== e),
                });
              else setData({ ...data, services: [...data.services, e] });
            }}
          />
        ))}
      </div>
      <br />

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue(data);
        }}
        isDisabled={data.categories.length === 0}
        onBack={onBack}
      />
    </div>
  );
}
