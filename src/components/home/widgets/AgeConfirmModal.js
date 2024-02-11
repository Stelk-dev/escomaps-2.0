import { Dialog } from "@mui/material";
import React from "react";
import img from "../../../assets/escomaps_logo.png";
import { Link } from "react-router-dom";

export default function AgeConfirmModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        backdropFilter: "blur(20px)",
      }}
      PaperProps={{
        style: {
          backgroundColor: "#141416",
          borderRadius: "24px",
          padding: "32px",
        },
      }}
    >
      <div
        style={{
          color: "white",
        }}
      >
        {/* Home */}
        <div
          style={{
            display: "flex",
            height: "300px",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img src={img} width={"200px"} alt="logo" />

          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "14px",
              }}
            >
              Confermi di avere almeno 18 anni?
            </h1>

            <div style={{ color: "#999999", padding: "0px 32px" }}>
              Prima di continuare devi confermare di avere almeno 18 anni per
              visualizzare questo sito web. Puoi leggere i nostri termini e
              condizioni{" "}
              <Link
                to={"/terms-and-conditions"}
                onClick={onClose}
                id="terms-and-conditions"
              >
                qui
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <button
              id="confirm-button"
              onClick={onClose}
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
              Confermo di avere almeno 18 anni
            </button>

            <a
              href={"https://google.com"}
              style={{
                border: "none",
                marginTop: "12px",
                backgroundColor: "transparent",
                textDecorationLine: "none",
                color: "grey",
              }}
            >
              Abbandona
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
