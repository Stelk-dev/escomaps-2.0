import React from "react";

export default function DisclaimerBox() {
  return (
    <div style={{ padding: "16px", color: "grey" }}>
      <h1
        style={{
          color: "white",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Fai Attenzione!
      </h1>
      {/* Disclaimer */}
      <br />
      <div style={{ fontSize: "13px" }}>
        <strong style={{ color: "white" }}>I CONTENUTI DI QUESTO SITO</strong>{" "}
        sono riservati esclusivamente ad un{" "}
        <strong style={{ color: "white" }}>PUBBLICO MAGGIORENNE</strong>
        <br />
        <strong style={{ color: "white" }}>1. PUBBLICO MAGGIORENNE</strong>: gli
        annunci non sono moderati e possono avere contenuti testuali ed immagini
        a corredo a carattere erotico e/o pornografico che non sono adatti a
        soggetti sensibili o che non gradiscano immagini esplicite a carattere
        sessuale.
        <br />
        <strong style={{ color: "white" }}>
          2. QUESTO SITO NON DISPONE DI ALCUN AGENTE
        </strong>
        <br />
        <br />
        Accedendo al sito e utilizzando i nostri servizi l'utente accetta i
        termini e le condizioni d'uso e si impegna ad informarsi su eventuali
        modifiche o aggiunte e ad utilizzare il sito in accordo ad esse.
        <br />
        <br />
        Gli annunci presenti sul sito Escomaps.com sono pubblicati su iniziativa
        autonoma e sotto la esclusiva responsabilità dell'inserzionista. La
        pubblicazione dei predetti annunci non é sottoposta ad alcun
        accertamento preventivo da parte di Escomaps.com.
        <br />
        <br />
        <strong style={{ color: "white" }}>
          Quest'ultima, non sarà, pertanto, in alcun modo responsabile della
          veridicità, della liceità, del rispetto del diritto di proprietà,
          della legalità e/o dell'eventuale contrarietà all'ordine pubblico o al
          buon costume, dei contenuti immessi on line
        </strong>
        <br />
        <br />
        Escomaps.com offre un servizio di pubblicazione e consultazione di
        annunci gratuiti su Internet senza svolgere alcun ruolo di
        interposizione, mediazione ed intermediazione tra gli utenti.
      </div>
    </div>
  );
}
