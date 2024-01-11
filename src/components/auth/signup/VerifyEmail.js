import React, { useEffect } from "react";
import { Auth } from "../../../Firebase";
import { SignOut } from "../../../services/Authentication";
import { useNavigate } from "react-router-dom";
import {
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../providers/AdvertiserUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

export default function VerifyEmail() {
  const [user] = useAuthState(Auth);
  const [currentUser, setcurrentuser] = useRecoilState(CurrentUserAdvertiser);
  const nv = useNavigate();

  async function ExitAndTryAgain() {
    const r = await SignOut();

    if (r) {
      setcurrentuser({
        uid: "",
        name: "",
        lastName: "",
        age: "",
        email: "",
        prefix: "",
        phoneNumber: "",
        adsIds: [],
        credits: 0,
        isOnline: false,
        identityVerified: false,
        emailVerified: false,
      });

      nv("/");
    }
  }

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      const emailVerified = user?.emailVerified;

      if (emailVerified) {
        UpdateAdvertiserData(user?.uid.toString(), {
          emailVerified: true,
        });
        setcurrentuser({
          ...currentUser,
          emailVerified: true,
        });
        nv("/signup-advertiser-add-data");
      }
    });

    return () => {};
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "100vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
          Verifica la tua email
        </h1>
        <div
          style={{
            marginTop: "12px",
            color: "#FFFFFFEE",
            fontWeight: "200",
            fontSize: 18,
            padding: "0px 32px",
            textAlign: "center",
          }}
        >
          <div>
            Ti abbiamo inviato un link di conferma all'email:
            <strong> {user?.email}</strong>
            <br />
            <br />
            Se la tua email è sbagliata o non è più attuale, clicca il pulsante
            qui sotto per rifare la registrazione:
          </div>

          <div style={{ height: "32px" }} />
          <button
            onClick={ExitAndTryAgain}
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Esci e riprova
          </button>
        </div>
      </div>
    </div>
  );
}
