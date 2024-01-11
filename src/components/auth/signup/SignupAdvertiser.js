import React, { useState } from "react";
import "../css/AuthAdvertiser.css";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../../../services/Authentication";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";

export default function SignupAdvertiser() {
  const [data, setData] = useState({
    email: "",
    password: "",
    acceptTOS: false,
  });

  const [error, setError] = useState(null);
  const [showPassword, setshowPassword] = useState(false);
  const [signupLoading, setsignupLoading] = useState(false);
  const [, setcurrentuser] = useRecoilState(CurrentUserAdvertiser);
  const navigate = useNavigate();

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8 && data.acceptTOS;

  function Signup() {
    if (signupLoading) return;

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    if (!emailValid) {
      setError("Inserisci una mail valida");
      return;
    }

    // Signup
    setsignupLoading(true);
    CreateUser(data.email, data.password).then((resp) => {
      setsignupLoading(false);

      if (typeof resp === "string") setError(resp);
      else {
        console.log(resp);
        setcurrentuser(resp);
        navigate("/signup-advertiser-verify-email");
      }
    });
  }

  return (
    <div className="main-div" style={{ height: "100vh" }}>
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
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="main-form"
              id="password"
              placeholder="password (8+ caratteri)"
              value={data.password}
              onChange={(v) => setData({ ...data, password: v.target.value })}
            ></input>
            <button
              style={{
                position: "absolute",
                top: "0px",
                right: "12px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "28px",
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={(e) => {
                e.preventDefault();
                setshowPassword(!showPassword);
              }}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </form>
        <br />

        {/* Error message */}
        {error != null ? (
          <p
            style={{
              color: "white",
              fontSize: 14,
              backgroundColor: "red",
              width: "50vw",
              maxWidth: "350px",
              minWidth: "200px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <MdErrorOutline size={18} />
            <div style={{ width: "4px" }} />
            <div style={{ fontSize: "15px" }}>{error}</div>
          </p>
        ) : (
          <></>
        )}

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
              style={{ width: 16, height: 16 }}
            />
          </div>

          <div style={{ paddingLeft: 16, color: "grey", fontSize: 12 }}>
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={!isButtonActive()}
          onClick={Signup}
        >
          {signupLoading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Registrati"
          )}
        </button>

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
            style={{ marginLeft: 8, color: "red" }}
          >
            Accedi ora
          </Link>
        </div>
      </div>
    </div>
  );
}
