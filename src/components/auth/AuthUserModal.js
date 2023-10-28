import { Modal } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import "./css/AuthUser.css";
import { Link } from "react-router-dom";

// TODO: Make 2 function one for login and one for registration
// In the main function add a bool to show login or signup

export default function AuthUserModal(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8;

  const Login = () => {};

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="center-class"
    >
      <div className="main-modal">
        {/* Cancel icon */}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <MdOutlineClear className="cancel-icon" onClick={props.onClose} />
        </div>
        <div style={{ height: 32 }} />

        {/* Title */}
        <div className="center-class">
          <h1 style={{ fontSize: 24 }}>Entra ora come utente</h1>
          <div style={{ color: "grey", marginTop: 8 }}>
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
              placeholder="email@gmail.com"
            ></input>
            <div style={{ height: 8 }} />
            <input
              type="password"
              className="main-form"
              id="password"
              placeholder="password"
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
          <div style={{ marginLeft: 8, color: "#B02D23", cursor: "pointer" }} onClick={() => {}} >
            Registrati ora
          </div>
        </div>

        <div style={{ height: 32 }} />
      </div>
    </Modal>
  );
}
