import { CircularProgress, Modal } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import "./css/AuthUser.css";
import { Link } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import {
  CreateAnonymousUser,
  CreateUser,
  LoginUser,
} from "../../services/Authentication";
import { useRecoilState } from "recoil";
import { CurrentUser, GetUserData } from "../../providers/ClientUserData";

// Make 2 function one for login and one for registration
// In the main function add a bool to show login or signup

function LoginUserModal(props) {
  const [, setClientUser] = useRecoilState(CurrentUser);
  const [loadingLogin, setLoadingLogin] = useState(false);

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
    setLoadingLogin(true);

    LoginUser(data.email, data.password).then((v) => {
      setLoadingLogin(false);

      if (typeof v === "string") {
        setError(v);
        return;
      }

      GetUserData(v.uid).then((userData) => {
        if (userData === null) {
          setError(
            "Sembra che il tuo account sia stato bannato. Contatta il servizio clienti per ulteriori spiegazioni"
          );
          return;
        }

        setClientUser(userData);
        props.onClose();
      });
    });
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
            value={data.email}
            onChange={(v) => HandleFormValue(v)}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="password"
            className="main-form"
            id="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={(v) => HandleFormValue(v)}
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={loadingLogin || !isButtonActive()}
        onClick={Login}
      >
        {loadingLogin ? (
          <CircularProgress size={24} style={{ color: "white" }} />
        ) : (
          "Accedi"
        )}
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

function SignupUserModal(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTOS: false,
  });

  const [, setUser] = useRecoilState(CurrentUser);
  const [loadingSignupAnonymous, setLoadingSignupAnonymous] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  function HandleFormValue(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState(null);

  const isButtonActive = () =>
    data.name.length >= 4 &&
    data.email.length > 8 &&
    data.password.length >= 8 &&
    data.acceptTOS;

  const Signup = () => {
    setLoadingSignup(true);

    CreateUser(data.email, data.password, data.name).then((v) => {
      setLoadingSignup(false);

      // Error
      if (typeof v === "string") {
        setError(v);
        return;
      }

      setUser(v);
      props.onClose();
    });
  };

  const SignupAsAnonymous = () => {
    setLoadingSignupAnonymous(true);
    CreateAnonymousUser().then((v) => {
      setLoadingSignupAnonymous(false);

      // Error
      if (typeof v === "string") {
        setError(v);
        return;
      }

      setUser(v);
      props.onClose();
    });
  };

  return (
    <div>
      {/* Title */}
      <div className="center-class">
        <h1 style={{ fontSize: 24 }}>Registrati ora come utente</h1>
        <div style={{ color: "grey", marginTop: 8, textAlign: "center" }}>
          Crea un nuovo account Escomaps per iniziare ad usare ogni funzionalità
          in app!
        </div>
      </div>

      <div style={{ height: 32 }} />

      {/* Form */}
      <div style={{ width: "100%" }}>
        <form>
          <input
            type="text"
            className="main-form"
            id="name"
            name="name"
            placeholder="Nickname (4+ caratteri)"
            value={data.name}
            onChange={(v) => HandleFormValue(v)}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="email"
            className="main-form"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            value={data.email}
            onChange={(v) => HandleFormValue(v)}
          ></input>
          <div style={{ height: 8 }} />
          <input
            type="password"
            className="main-form"
            id="password"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={(v) => HandleFormValue(v)}
          ></input>
        </form>
        <div style={{ height: 8 }} />

        {/* Checkbox TOS */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0px 8px",
            alignItems: "center",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={data.acceptTOS}
              onChange={() => setData({ ...data, acceptTOS: !data.acceptTOS })}
              style={{ width: 18, height: 18 }}
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
            e autorizzi il trattamento dei tuoi dati personali per la fornitura
            di questo servizio
          </div>
        </div>
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={loadingSignup || !isButtonActive()}
        onClick={Signup}
      >
        {loadingSignup ? (
          <CircularProgress size={24} style={{ color: "white" }} />
        ) : (
          "Entra"
        )}
      </button>
      <div
        className="center-class"
        style={{
          padding: "12px",
          width: "100%",
          fontSize: "14px",
          color: "grey",
        }}
      >
        Oppure
      </div>

      {/* Signu up anonymous */}
      <button
        type="submit"
        style={{
          width: "100%",
          border: "none",
          padding: "12px",
          borderRadius: "4px",
          fontWeight: "500",
          color: "white",
          backgroundColor: "#B02D23",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={SignupAsAnonymous}
        disabled={loadingSignupAnonymous}
      >
        {loadingSignupAnonymous ? (
          <CircularProgress size={24} style={{ color: "white" }} />
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUserSecret style={{ marginRight: "8px", fontSize: 18 }} />
            <div>Entra come anonimo</div>
          </div>
        )}
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
      onClose={() => {
        setShowLogin(true);
        props.onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="center-class"
      style={{ backgroundColor: "#00000077" }}
    >
      <div className="main-modal">
        {/* Cancel icon */}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <MdOutlineClear
            className="cancel-icon"
            onClick={() => {
              setShowLogin(true);
              props.onClose();
            }}
          />
        </div>

        {/* Main home */}
        <div style={{ padding: "32px 0px" }}>
          {showLogin ? (
            <LoginUserModal
              changeFlow={() => setShowLogin(false)}
              onClose={props.onClose}
            />
          ) : (
            <SignupUserModal
              changeFlow={() => setShowLogin(true)}
              onClose={props.onClose}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
