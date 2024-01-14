import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../../../Firebase";
import {
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../providers/AdvertiserUserData";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import PrefixDropDown from "../../widgets/PrefixDropDown";

export default function AdvertiserDataSignup() {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    age: "",
    prefix: "+39",
    phoneNumber: "",
  });

  const isButtonActive = () =>
    data.name.length >= 4 &&
    data.lastName.length >= 4 &&
    data.age.length >= 2 &&
    parseInt(data.age) >= 18 &&
    data.phoneNumber.length >= 4;

  const [user] = useAuthState(Auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setcurrentuser] = useRecoilState(CurrentUserAdvertiser);

  async function SaveData() {
    if (loading) return;

    setLoading(true);
    await UpdateAdvertiserData(user.uid, {
      name: data.name,
      lastName: data.lastName,
      prefix: data.prefix,
      phoneNumber: data.phoneNumber,
      age: data.age,
    });
    setcurrentuser({
      ...currentUser,
      name: data.name,
      lastName: data.lastName,
      prefix: data.prefix,
      phoneNumber: data.phoneNumber,
      age: data.age,
    });
    setLoading(false);

    navigate("/signup-advertiser-verify-identity");
  }

  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "100vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 32, textAlign: "center" }}>
          Informazioni su di te
        </h1>
        <div
          style={{
            marginTop: "12px",
            color: "#FFFFFFEE",
            fontWeight: "200",
            fontSize: 16,
            padding: "0px 32px",
            textAlign: "center",
          }}
        >
          <div>Aggiungi questi dati per iniziare a pubblicare su Escomaps:</div>
          <div style={{ height: "24px" }} />

          {/* Forms */}
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <label className="label-style">Nome e cognome</label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                className="main-form"
                id="name"
                placeholder="Nome (4+ caratteri)"
                onChange={(v) => setData({ ...data, name: v.target.value })}
              ></input>
              <div style={{ width: "16px" }} />
              <input
                type="text"
                className="main-form"
                id="lastname"
                placeholder="Cognome (4+ caratteri)"
                onChange={(v) => setData({ ...data, lastName: v.target.value })}
              ></input>
            </div>
            <div style={{ height: "24px" }} />

            <label className="label-style">Età</label>
            <input
              type="number"
              className="main-form"
              id="age"
              placeholder="Età"
              onChange={(v) => setData({ ...data, age: v.target.value })}
            ></input>
            <div style={{ height: "24px" }} />

            <label className="label-style">Numbero di cellulare</label>
            <div
              style={{ display: "flex", position: "relative", width: "100%" }}
            >
              <PrefixDropDown
                valueSelected={data.prefix}
                onChange={(v) => setData({ ...data, prefix: v.target.value })}
              />
              <input
                type="text"
                className="main-form"
                id="number"
                placeholder="12345678"
                style={{ paddingLeft: "64px" }}
                onChange={(v) =>
                  setData({ ...data, phoneNumber: v.target.value })
                }
              ></input>
            </div>

            <div style={{ height: "32px" }} />
            <button
              onClick={(e) => {
                e.preventDefault();
                SaveData();
              }}
              type="submit"
              disabled={!isButtonActive()}
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
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Continua"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
