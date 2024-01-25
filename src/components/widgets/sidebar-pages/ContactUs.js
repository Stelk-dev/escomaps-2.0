import React from "react";

export default function ContactUs() {
  return (
    <div className="default-information-page" style={{ height: "80vh" }}>
      <h1>Siamo qui per aiutarti</h1>
      <br />
      <div>
        <div>
          Per qualsiasi domande, esigenza, o problema generico puoi scriverci
          all'indirizzo:
        </div>
        <a href="mailto:support@escomaps.com" target="_blank" rel="noreferrer">
          support@escomaps.com
        </a>
        {/* <div>o al numero:</div> */}
        {/* <a href="https://wa.me/+39388098323" target="_blank" rel="noreferrer">
          +39 388 098 323
        </a> */}
      </div>

      <div
        style={{
          fontStyle: "italic",
          marginTop: "8px",
          color: "grey",
          fontSize: "14px",
        }}
      >
        Ti risponderemo in meno di 24 ore lavorative
      </div>
    </div>
  );
}
