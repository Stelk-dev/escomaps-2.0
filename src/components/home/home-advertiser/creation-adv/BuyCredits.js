import React, { useState } from "react";
import {
  CreditsToShow,
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../../providers/AdvertiserUserData";
import { useRecoilState, useRecoilValue } from "recoil";
import "./CreationAdv.css";
import { Checkbox, CircularProgress } from "@mui/material";
import { FaCircleCheck, FaRegCircle } from "react-icons/fa6";
import { Prices } from "../../../../constants/ValueConstants";
import { useNavigate } from "react-router-dom";

export default function BuyCredits() {
  const credits = useRecoilValue(CreditsToShow);
  const [user, setUser] = useRecoilState(CurrentUserAdvertiser);
  const navigate = useNavigate();
  const [boxOfCredits, setBoxOfCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const CreditBox = ({
    totCredits,
    price,
    recommended,
    subTitle = null,
    priceDiscounted = null,
  }) => {
    const boxSelected =
      boxOfCredits.filter((v) => v.totCredits === totCredits).length > 0;

    return (
      <div
        className={
          "credits-box-to-pay" + (boxSelected ? " box-to-pay-selected" : "")
        }
        onClick={() => {
          if (boxSelected)
            setBoxOfCredits(
              boxOfCredits.filter((v) => v.totCredits !== totCredits)
            );
          else
            setBoxOfCredits([
              ...boxOfCredits,
              { totCredits: totCredits, price: priceDiscounted ?? price },
            ]);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox
            defaultChecked={boxSelected}
            icon={<FaRegCircle />}
            checkedIcon={<FaCircleCheck />}
            style={{
              color: boxSelected ? "#BA68C8" : "white",
              padding: "0px",
              borderRadius: "100%",
            }}
            size="18px"
          />
          {/* Credits */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginLeft: "12px",
            }}
          >
            <div style={{ fontWeight: "600" }}>{totCredits} crediti 💎</div>
            {subTitle && (
              <div
                style={{ color: "grey", fontSize: "11px", fontWeight: "500" }}
              >
                {subTitle}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {recommended && (
            <div
              style={{
                backgroundColor: "#BA68C8",
                borderRadius: "50px",
                padding: "4px 10px",
                fontSize: "13px",
                marginRight: "16px",
              }}
            >
              Raccomandato
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            <div
              className={
                priceDiscounted !== null
                  ? "credits-price-discounted"
                  : "credits-price"
              }
            >
              {price} €
            </div>
            {priceDiscounted && (
              <div className="credits-price">{priceDiscounted} €</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TotalCredits = () => {
    return boxOfCredits.map((e) => e.totCredits).reduce((sum, v) => sum + v, 0);
  };

  const TotalPriceForCredits = () => {
    const vl = boxOfCredits
      .map((e) => e.price)
      .reduce((sum, v) => sum + v, 0)
      .toString();
    return parseFloat(vl).toFixed(2);
  };

  const IsButtonActive = () => {
    return loading || boxOfCredits.length > 0;
  };

  const Continue = () => {
    setLoading(true);

    // TODOs: stripe webview function call

    // Save new data to user
    const newCredits = user.credits + TotalCredits();
    UpdateAdvertiserData(user.uid, {
      credits: newCredits,
    }).then((v) => {
      setLoading(false);
      setUser({ ...user, credits: newCredits });
      navigate("/buy-credits/buy-success", {
        state: { totalCredits: TotalCredits() },
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          marginTop: "90px",
          padding: "0px 16px",
          width: "100vw",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        {/* Title and description */}
        <h1 style={{ fontWeight: "600", fontSize: 40 }}>Acquista crediti</h1>
        <p
          style={{
            color: "#FFFFFFAA",
            fontWeight: "200",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          I crediti sono necessari per la pubblicazione di annunci
        </p>
        <br />

        {/* Credits */}
        <div style={{ fontSize: "18px", width: "100%", textAlign: "start" }}>
          Crediti: <strong style={{ color: "#BA68C8" }}>{credits}</strong>
        </div>
        <br />

        {/* Prices */}
        {Prices.map((e, i) => (
          <CreditBox
            totCredits={e.totCredits}
            price={e.price}
            priceDiscounted={e.priceDiscounted}
            subTitle={
              e.creditsFreeInMore === null
                ? null
                : e.totCredits -
                  e.creditsFreeInMore +
                  " + " +
                  e.creditsFreeInMore +
                  " GRATIS"
            }
            recommended={e.recommended}
          />
        ))}
        <br />

        {/* Continue button */}
        <button
          onClick={() => IsButtonActive() && Continue()}
          style={{
            width: "100%",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            fontWeight: "500",
            color: IsButtonActive() ? "white" : "#FFFFFF66",
            backgroundColor: IsButtonActive() ? "#B02D23" : "#FFFFFF33",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : IsButtonActive() ? (
            "Compra " +
            TotalCredits() +
            " crediti per " +
            TotalPriceForCredits() +
            " €"
          ) : (
            "Seleziona crediti da comprare"
          )}
        </button>
        <br />
      </div>
    </div>
  );
}
