import React, { useState } from "react";
import './css/AuthAdvertiser.css';
import { Link } from "react-router-dom";

export default function LoginAdvertiser() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8 && data.acceptTOS;

  function Login() {
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
        <h1 style={{ fontWeight: "600", fontSize: 40 }}>Accedi ora</h1>
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
          Accedi al tuo account Escomaps per continuare a pubblicare subito!
        </p>

        <div style={{ height: 32 }} />

        {/* Form */}
        <div style={{ width: "100%" }}>
            <form>
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
            <div style={{height: 8}}/>
            
            {/* Forgot email/password */}
            <Link to="" className="link-style" style={{fontSize: 12}}>Non ricordi email o password? Clicca qui</Link>
        </div>

        <br />

        {/* Login up */}
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
          onClick={Login}
        >
          Accedi
        </button>

        {/* Error message */}
        {error != null ? (
          <p style={{ color: "red", fontSize: 14, paddingTop: 8 }}>{error}</p>
        ) : (
          <></>
        )}

        {/* Login */}
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 24, fontSize: 14}}>
          <div>Non hai ancora un account?</div>
          <Link to="/signup-advertiser" className="link-style" style={{marginLeft: 8, color: '#B02D23'}}>Registrati ora</Link>
        </div>
      </div>
    </div>
  );
}
