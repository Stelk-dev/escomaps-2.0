import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../../../Firebase";
import {
  CurrentUserAdvertiser,
  SetAdvertiserData,
} from "../../../providers/AdvertiserUserData";

export default function AdvertiserDataSignup() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    age: "",
    prefiSelected: "+39",
    phoneNumber: "",
  });

  const isButtonActive = () =>
    data.name.length >= 4 &&
    data.lastname.length >= 4 &&
    data.age.length >= 2 &&
    parseInt(data.age) >= 18 &&
    data.phoneNumber.length >= 4;

  const [user] = useAuthState(Auth);

  function SaveData() {
    console.log(data);
    SetAdvertiserData(user.uid, {
      ...CurrentUserAdvertiser,
      name: data.name,
      lastname: data.lastname,
      prefiSelected: data.prefiSelected,
      phoneNumber: data.phoneNumber,
      age: data.age,
    });
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
                value={data.email}
                onChange={(v) => setData({ ...data, name: v.target.value })}
              ></input>
              <div style={{ width: "16px" }} />
              <input
                type="text"
                className="main-form"
                id="lastname"
                placeholder="Cognome (4+ caratteri)"
                value={data.email}
                onChange={(v) => setData({ ...data, lastname: v.target.value })}
              ></input>
            </div>
            <div style={{ height: "24px" }} />

            <label className="label-style">Età</label>
            <input
              type="number"
              className="main-form"
              id="age"
              placeholder="Età"
              value={data.email}
              onChange={(v) => setData({ ...data, age: v.target.value })}
            ></input>
            <div style={{ height: "24px" }} />

            <label className="label-style">Numbero di cellulare</label>
            <div
              style={{ display: "flex", position: "relative", width: "100%" }}
            >
              <div
                style={{
                  position: "absolute",
                  fontWeight: "bold",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  left: "8px",
                }}
              >
                <select
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    padding: "4px 8px",
                    border: "1px solid black",
                    borderRadius: "8px",
                    backgroundColor: "#333333",
                  }}
                  value={data.prefiSelected}
                  onChange={(v) =>
                    setData({ ...data, prefiSelected: v.target.value })
                  }
                >
                  <option value="+39">+39</option>
                  <option value="+44">+44</option>
                  <option value="+3">+3</option>
                </select>
              </div>
              <input
                type="text"
                className="main-form"
                id="number"
                placeholder="12345678"
                value={data.email}
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
              Continua
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
