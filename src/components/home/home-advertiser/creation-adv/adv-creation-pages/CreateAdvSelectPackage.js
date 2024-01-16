import React from "react";
import { useRecoilValue } from "recoil";
import { CreditsToShow } from "../../../../../providers/AdvertiserUserData";
import { FaArrowRight } from "react-icons/fa";

export default function CreateAdvSelectPackage({ onContinue }) {
  const credits = useRecoilValue(CreditsToShow);

  const PackageCredits = ({ title, totCredits, subTitle, hoursLeft }) => {
    return (
      <div
        className="package-box-create-adv"
        onClick={() =>
          onContinue({
            packageSelected: { totCredits: totCredits, hoursLeft: hoursLeft },
          })
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            {/* Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  marginRight: "12px",
                }}
              >
                {title}
              </div>

              {/* Tot crediti */}
              <div
                style={{
                  backgroundColor: "#BA68C8",
                  borderRadius: "30px",
                  padding: "6px 10px",
                  fontSize: "11px",
                  marginRight: "16px",
                }}
              >
                {totCredits} 💎 crediti
              </div>
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: "grey",
                fontSize: "11px",
                fontWeight: "500",
                marginTop: "4px",
              }}
            >
              {subTitle}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaArrowRight size={20} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Seleziona pacchetto
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Seleziona il tipo di pacchetto per il tuo annuncio
      </div>
      <br />

      <div style={{ fontSize: "16px" }}>
        I tuoi crediti:{" "}
        <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
          {credits}
        </strong>
      </div>
      <br />

      {/* List packages */}
      <PackageCredits
        title={"Giornaliero"}
        totCredits={30}
        subTitle={
          "Il pacchetto Giornaliero comprende un annuncio valido per 24 ore"
        }
        hoursLeft={24}
      />
      <PackageCredits
        title={"Settimanale"}
        totCredits={100}
        subTitle={
          "Il pacchetto Settimanale comprende un annuncio valido per 7 giorni"
        }
        hoursLeft={168}
      />
      <PackageCredits
        title={"Mensile"}
        totCredits={300}
        subTitle={
          "Il pacchetto Giornaliero comprende un annuncio valido per 31 giorni"
        }
        hoursLeft={744}
      />
    </div>
  );
}
