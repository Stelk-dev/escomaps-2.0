import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";
import { Cities } from "../../constants/ValueConstants";
import img from "../../assets/escomaps_logo.png";

export default function Footer() {
  return (
    <div
      style={{
        paddingTop: "50px",
        paddingBottom: "66px",
        width: "100vw",
        backgroundColor: "#1A1A1A",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          width: "100%",
          padding: "0px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/* Who we are */}
          <div style={{ flex: 1 }}>
            <h5 className="title-footer">Chi siamo</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Link
                to={"/terms-and-conditions"}
                className="link-footer"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                Termini e condizioni
              </Link>
              <Link
                to={"/privacy-policy"}
                className="link-footer"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                Privacy Policy
              </Link>
              <Link
                to={"/faq"}
                className="link-footer"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                FAQs
              </Link>
              <Link
                to={"/contact-us"}
                className="link-footer"
                onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                Contattaci
              </Link>
            </div>
          </div>

          <div style={{ width: "24px" }} />

          {/* Popular city */}
          <div style={{ flex: 1 }}>
            <h5 className="title-footer">Città popolari</h5>
            <div>
              {Object.entries(Cities).map((map) => (
                <Link
                  key={map[1]}
                  to={"/escorts" + map[1]}
                  className="city-link-footer"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "instant" })
                  }
                >
                  {map[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: "60px",
            color: "#AAAAAA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={img}
            style={{
              width: 120,
              cursor: "pointer",
              objectFit: "contain",
              marginRight: "12px",
            }}
            alt="logo_escort"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <div style={{ textAlign: "center" }}>
            © 2024 Escomaps. Tutte le escorts hanno acconsentito ad avere almeno
            18 anni di età.
          </div>
        </div>
      </div>
    </div>
  );
}
