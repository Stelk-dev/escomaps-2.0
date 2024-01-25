import React from "react";

export default function Faq() {
  function FAQElement({ title, description }) {
    return (
      <div style={{ margin: "28px 0px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{title}</h2>
        <div style={{ fontSize: "14px", color: "#888888", marginTop: "4px" }}>
          {description}
        </div>
      </div>
    );
  }

  function Divider() {
    return (
      <div
        style={{ width: "100%", height: "1px", backgroundColor: "#FFFFFF33" }}
      ></div>
    );
  }

  return (
    <div className="default-information-page">
      <div className="default-information-page-child">
        <h1 style={{ fontSize: "32px" }}>Domande frequenti</h1>
        <br />

        <FAQElement
          title={"Come utilizzate i dati della mia posizione?"}
          description={
            "Noi di Escomaps utilizziamo i dati della tua posizione solo ed esclusivamente per permetterti di visualizzare chi è vicino a te. Potrai sempre ed in ogni caso disabilitare l'accesso alla tua posizione in tempo reale nella pagina impostazioni del tuo account"
          }
        />
        <Divider />

        <FAQElement
          title={"La posizione dei profili è attendibile?"}
          description={
            "Per noi di Escomaps è fondamentale l'attendibilità dei dati di chi pubblica attraverso la nostra piattaforma. Diamo al pubblicista la possibilità di scegliere tra una posizione essatta ed una con un raggio di imprecisione di 500 metri, per coloro che di più tengono alla propria privacy"
          }
        />
        <Divider />

        <FAQElement
          title={
            "Ho bisogno di aggiungere la mia email e password per registrarmi come utente?"
          }
          description={
            "NO! Crediamo che la privacy sia al primo posto e per tale ragione abbiamo pensato ad un login anonimo senza bisogno di aggiungere nessun numero di telefono o indirizzo e-mail"
          }
        />
      </div>
    </div>
  );
}
