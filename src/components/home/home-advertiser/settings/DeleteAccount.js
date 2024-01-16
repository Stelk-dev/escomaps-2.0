import React from "react";

export default function DeleteAccount() {
  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "90vw", maxWidth: "600px" }}>
        <h1
          style={{
            fontWeight: "600",
            fontSize: 40,
            textAlign: "center",
            color: "red",
          }}
        >
          Vuoi davvero eliminare il tuo account?
        </h1>
        <div
          style={{
            color: "#FFFFFF",
            fontWeight: "200",
            fontSize: "16px",
            padding: "0px 32px",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          <div>
            Una volta eliminato il tuo account verranno eliminati anche tutti i
            tuoi annunci, le tue chat e le tue informazioni personali
          </div>

          <br />

          <div>
            Non sarà più possibile ripristinare il tuo account in nessun modo.
          </div>

          <br />

          <div>
            Se sei sicuro di voler procedere contatta il servizio clienti a
            questa email:
          </div>

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
