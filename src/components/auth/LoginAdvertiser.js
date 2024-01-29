import React, { useEffect, useState } from "react";
import "./css/AuthAdvertiser.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { LoginUser } from "../../services/Authentication";
import { GetAdvertiserData } from "../../providers/AdvertiserUserData";

export default function LoginAdvertiser() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setshowPassword] = useState(false);
  const [loginLoading, setloginLoading] = useState(false);
  const navigate = useNavigate();

  const isButtonActive = () =>
    data.email.length > 8 && data.password.length >= 8;

  function Login() {
    if (loginLoading) return;

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      data.email
    );
    if (!emailValid) {
      setError("Inserisci una mail valida");
      return;
    }

    // Continue
    setloginLoading(true);
    LoginUser(data.email, data.password).then((resp) => {
      setloginLoading(false);

      if (typeof resp === "string") setError(resp);
      else {
        GetAdvertiserData(resp.uid).then((advertiser) => {
          if (advertiser === null) return;

          // Continue signup flow
          if (advertiser.emailVerified === false)
            return navigate("/signup-advertiser-verify-email");
          else if (advertiser.name.length === 0)
            return navigate("/signup-advertiser-add-data");
          else if (advertiser.identityVerified === false)
            return navigate("/signup-advertiser-verify-identity");
          // If signup finished go to main home
          else return navigate("/advertiser/ads");
        });
      }
    });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && isButtonActive()) {
      e.preventDefault();
      Login();
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="main-div" style={{ height: "100vh" }}>
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
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="main-form"
                id="password"
                placeholder="password"
                value={data.password}
                onKeyPress={handleKeyPress}
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

            <div style={{ height: 8 }} />

            {/* Forgot email/password */}
            <div
              style={{
                fontSize: 12,
                display: "flex",
              }}
            >
              <div>Non ricordi email o password?</div>
              <Link
                to="/forgot-credentials"
                className="link-style"
                style={{ marginLeft: "4px" }}
              >
                Clicca qui
              </Link>
            </div>

            {/* Error message */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "16px 0px",
              }}
            >
              {error != null ? (
                <p
                  style={{
                    color: "white",
                    fontSize: 14,
                    backgroundColor: "red",
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
            </div>

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
              disabled={!isButtonActive()}
              onClick={(v) => {
                v.preventDefault();
                Login();
              }}
            >
              {loginLoading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Accedi"
              )}
            </button>
          </form>

          {/* Signup */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 14,
              fontSize: 14,
            }}
          >
            <div>Non hai ancora un account?</div>
            <Link
              to="/signup-advertiser"
              className="link-style"
              style={{
                marginLeft: "4px",
                color: "red",
              }}
            >
              Registrati ora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
