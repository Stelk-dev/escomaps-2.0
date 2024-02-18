import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../providers/AdvertiserUserData";
import { CircularProgress } from "@mui/material";

export default function SuccessScreen({
  title,
  isBuyFlow = true,
  isAdvCreation = false,
}) {
  const [user, setUser] = useRecoilState(CurrentUserAdvertiser);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const [dataSession, setDataSession] = useState({
    totalCredits: undefined,
  });

  let location = useLocation();

  useEffect(() => {
    if (
      isBuyFlow &&
      dataSession.totalCredits === undefined &&
      user.uid.length > 0
    )
      GetSession();
  }, [user.uid]);

  const GetSession = async () => {
    // Function to extract query params
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");
    if (typeof sessionId !== "string") return;

    setloading(true);

    try {
      const resp = await fetch(
        "https://europe-west1-escomaps.cloudfunctions.net/checkoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId: sessionId }),
        }
      );

      if (resp.status !== 200) return;

      const _json = await resp.json();

      if (_json.totalCredits === undefined) return;

      setDataSession((pre) => (pre = _json));

      if (!user.paymentSessions.includes(sessionId)) {
        // Save new data to user
        const newCredits = user.credits + _json.totalCredits;
        UpdateAdvertiserData(user.uid, {
          paymentSessions: [...user.paymentSessions, sessionId],
          credits: newCredits,
        }).then(() => {
          setUser({
            ...user,
            credits: newCredits,
            paymentSessions: [...user.paymentSessions, sessionId],
          });
        });
      }
    } catch (_) {}

    setloading(false);
  };

  return (
    <div className="main-div" style={{ height: "100vh" }}>
      {loading ? (
        <CircularProgress style={{ color: "white" }} />
      ) : dataSession.totalCredits === undefined ? (
        <div className="main-div" style={{ width: "100vw", maxWidth: "800px" }}>
          <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
            Ci scusiamo per il disagio ma sembra che ci siano stati errori con
            il tuo pagamento
          </h1>
          <p
            style={{
              marginTop: "12px",
              color: "#FFFFFFEE",
              fontWeight: "200",
              fontSize: 18,
              padding: "0px 32px",
              textAlign: "center",
            }}
          >
            Contattaci alla nostra mail per ricevere assistenza immediata:{" "}
            <a
              href="mailto:support@escomaps.com"
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: "bold", color: "#BA68C8" }}
            >
              support@escomaps.com
            </a>
          </p>
        </div>
      ) : (
        <div className="main-div" style={{ width: "100vw", maxWidth: "600px" }}>
          <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
            {title}
          </h1>
          <div
            style={{
              marginTop: "12px",
              color: "#FFFFFFEE",
              fontWeight: "200",
              fontSize: 18,
              padding: "0px 32px",
              textAlign: "center",
            }}
          >
            {isBuyFlow && (
              <div style={{ color: "white", textAlign: "center" }}>
                Il tuo ordine di{" "}
                <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
                  {dataSession.totalCredits} 💎 crediti
                </strong>{" "}
                è stato processato correttamente
              </div>
            )}
            {isAdvCreation && (
              <div style={{ color: "white", textAlign: "center" }}>
                Il tuo annuncio{" "}
                <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
                  è ora visibile a tutti!
                </strong>
              </div>
            )}

            <div style={{ height: "32px" }} />
            <button
              onClick={() => navigate("/advertiser/ads")}
              type="submit"
              style={{
                width: "100%",
                border: "none",
                padding: "12px",
                borderRadius: "4px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#B02D23",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Torna alla home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
