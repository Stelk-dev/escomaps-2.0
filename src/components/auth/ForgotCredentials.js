import React from "react";

export default function ForgotCredentials() {
  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "90vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
          Dimenticato email o password?
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
          <div>
            Contatta il servizio clienti con l'email deltuo account con cui ti
            sei registrato su escomaps:
          </div>

          <div style={{ height: "32px" }} />
          <a
            href="mailto:support@escomaps.com"
            style={{ fontWeight: "bold", color: "#BA68C8" }}
            target="blank"
          >
            support@escomaps.com
          </a>
        </div>
      </div>
    </div>
  );
}
