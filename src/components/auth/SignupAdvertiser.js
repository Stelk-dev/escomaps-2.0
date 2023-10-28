import React, { useState } from "react";
import "./css/AuthAdvertiser.css";
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
        <div
          style={{ display: "flex", flexDirection: "row", padding: "0px 8px", alignItems: 'center' }}
        >
          <div>
            <input
              type="checkbox"
              checked={data.acceptTOS}
              onChange={() =>
                setData({ ...data, acceptTOS: !data.acceptTOS })
              }
              style={{width: 18, height: 18}}
            />
          </div>

          <div style={{ paddingLeft: 16, color: "grey", fontSize: 13 }}>
            Cliccando su registrati ora confermi di aver letto e accettato i{" "}
            <Link to="" className="link-style">
              <strong style={{ color: "white" }}>Termini e condizioni</strong>
            </Link>{" "}
            e{" "}
            <Link to="" className="link-style">
              <strong style={{ color: "white" }}>
                Informativa sulla privacy
              </strong>
            </Link>{" "}
            e autorizzi il trattamento dei tuoi dati personali per la
            fornitura di questo servizio
          </div>
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

        {/* Login */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 14,
            fontSize: 14,
          }}
        >
          <div>Hai già un account?</div>
          <Link
            to="/login-advertiser"
            className="link-style"
            style={{ marginLeft: 8, color: "#B02D23" }}
          >
            Accedi ora
          </Link>
        </div>
      </div>
    </div>
  );
}
