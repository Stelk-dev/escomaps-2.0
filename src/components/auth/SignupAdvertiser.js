import React, { useState } from "react";
import "./css/SignupAdvertiser.css";
import { Link } from "react-router-dom";

export default function SignupAdvertiser() {
  const [data, setData] = useState({
    email: "",
    password: "",
    acceptTOS: false,
  });

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8 && data.acceptTOS;

  function Signup() {
    console.log(data);

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    console.log(emailValid);
    if (!emailValid) {
      setError("Inserisci una mail valida");
      return;
    }

    // Continue
  }

  return (
    <div className="main-div" style={{ height: "80vh" }}>
      <div className="main-div" style={{ width: "90vw", maxWidth: "600px" }}>
        {/* Title and description */}
        <h1 style={{ fontWeight: "600", fontSize: 40 }}>Registrati ora</h1>
        <br />
        <p
          style={{
            color: "#FFFFFFEE",
            fontWeight: "200",
            fontSize: 18,
            padding: "0px 32px",
            textAlign: "center",
          }}
        >
          Registrati subito per iniziare a pubblicare su Escomaps
        </p>

        <div style={{ height: 32 }} />

        {/* Forms */}
        <form style={{ width: "100%" }}>
          <input
            type="email"
            className="main-form"
            id="email"
            placeholder="email@gmail.com"
            value={data.email}
            onChange={(v) => setData({ ...data, email: v.target.value })}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="password"
            className="main-form"
            id="password"
            placeholder="password (8+ caratteri)"
            value={data.password}
            onChange={(v) => setData({ ...data, password: v.target.value })}
          ></input>
        </form>
        <br />

        {/* Checkbox TOS */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label
            style={{
              display: "flex",
              padding: "0px 8px",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={data.acceptTOS}
              onChange={() => setData({ ...data, acceptTOS: !data.acceptTOS })}
              style={{ width: 60, height: 60 }}
            />

            <div style={{ paddingLeft: 16, color: "grey", fontSize: 13 }}>
              Cliccando su registrati ora confermi di aver letto e accettato i{" "}
              <Link to="" style={{ textDecoration: "none" }}>
                <strong style={{ color: "white" }}>Termini e condizioni</strong>
              </Link>{" "}
              e{" "}
              <Link to="" style={{ textDecoration: "none" }}>
                <strong style={{ color: "white" }}>
                  Informativa sulla privacy
                </strong>
              </Link>{" "}
              e autorizzi il trattamento dei tuoi dati personali per la
              fornitura di questo servizio
            </div>
          </label>
        </div>
        <br />

        {/* Signup up */}
        <button
          type="submit"
          style={{
            width: "100%",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            fontWeight: "500",
            color: isButtonActive() ? "white" : "#FFFFFF66",
            backgroundColor: isButtonActive() ? "#B02D23" : "#FFFFFF33",
          }}
          disabled={!isButtonActive()}
          onClick={Signup}
        >
          Registrati
        </button>

        {/* Error message */}
        {error != null ? (
          <p style={{ color: "red", fontSize: 14, paddingTop: 8 }}>{error}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
