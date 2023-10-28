import { Modal } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import "./css/AuthUser.css";
import { Link } from "react-router-dom";

// TODO: Make 2 function one for login and one for registration
// In the main function add a bool to show login or signup

function LoginUser(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function HandleFormValue(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8;

  const Login = () => {
    // TODO: Continue
    setError("Password incorretta");
  };

  return (
    <div>
      {/* Title */}
      <div className="center-class">
        <h1 style={{ fontSize: 24 }}>Entra ora come utente</h1>
        <div style={{ color: "grey", marginTop: 8, textAlign: "center" }}>
          Accedi al tuo account Escomaps
        </div>
      </div>

      <div style={{ height: 32 }} />

      {/* Form */}
      <div style={{ width: "100%" }}>
        <form>
          <input
            type="email"
            className="main-form"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            value={(v) => HandleFormValue(v)}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="password"
            className="main-form"
            id="password"
            name="passwrod"
            placeholder="password"
            value={(v) => HandleFormValue(v)}
          ></input>
        </form>
        <div style={{ height: 8 }} />

        {/* Forgot email/password */}
        <Link to="" className="link-style" style={{ fontSize: 12 }}>
          Non ricordi email o password? Clicca qui
        </Link>
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

      {/* Signup */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 14,
          fontSize: 14,
        }}
      >
        <div>Non hai ancora un account?</div>
        <div
          style={{ marginLeft: 8, color: "#B02D23", cursor: "pointer" }}
          onClick={props.changeFlow}
        >
          Registrati ora
        </div>
      </div>
    </div>
  );
}

function SignupUser(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function HandleFormValue(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8;

  const Login = () => {
    // TODO: Continue
    setError("Password incorretta");
  };

  return (
    <div>
      {/* Title */}
      <div className="center-class">
        <h1 style={{ fontSize: 24 }}>Registrati ora come utente</h1>
        <div style={{ color: "grey", marginTop: 8, textAlign: "center" }}>
          Crea un nuovo account Escomaps per iniziare ad usare funzionalità in
          app!
        </div>
      </div>

      <div style={{ height: 32 }} />

      {/* Form */}
      <div style={{ width: "100%" }}>
        <form>
          <input
            type="email"
            className="main-form"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            value={(v) => HandleFormValue(v)}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="password"
            className="main-form"
            id="password"
            name="passwrod"
            placeholder="password"
            value={(v) => HandleFormValue(v)}
          ></input>
        </form>
        <div style={{ height: 8 }} />

        {/* TOS */}
        {/* <Link to="" className="link-style" style={{ fontSize: 12 }}>
          Non ricordi email o password? Clicca qui
        </Link> */}
      </div>
      <br />

      {/* Signu up */}
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
          alignItems: "center",
          justifyContent: "center",
          marginTop: 14,
          fontSize: 14,
        }}
      >
        <div>Hai già un account?</div>
        <div
          style={{ marginLeft: 8, color: "#B02D23", cursor: "pointer" }}
          onClick={props.changeFlow}
        >
          Accedi ora
        </div>
      </div>
    </div>
  );
}

export default function AuthUserModal(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="center-class"
      style={{ backgroundColor: "#00000077" }}
    >
      <div className="main-modal">
        {/* Cancel icon */}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <MdOutlineClear className="cancel-icon" onClick={props.onClose} />
        </div>

        {/* Main home */}
        <div style={{ padding: "32px 0px" }}>
          {showLogin ? (
            <LoginUser changeFlow={() => setShowLogin(false)} />
          ) : (
            <SignupUser changeFlow={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </Modal>
  );
}
