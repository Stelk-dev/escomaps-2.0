import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  CurrentUser,
  UpdateUserData,
} from "../../../../providers/ClientUserData";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditUserInformation() {
  const [loadingEditData, setLoadingEditData] = useState(false);
  const [user, setUser] = useRecoilState(CurrentUser);
  const [data, setData] = useState({
    name: user.name,
  });
  const navigate = useNavigate();

  const IsButtonDisabled = () => {
    return user.name === data.name;
  };

  const EditData = () => {
    setLoadingEditData(true);

    UpdateUserData(user.uid, data)
      .then((v) => {
        setUser({ ...user, ...data });
        setLoadingEditData(false);
        navigate("/");
      })
      .catch((e) => {
        setLoadingEditData(false);
      });
  };

  return (
    <div
      style={{
        height: "80vh",
        marginTop: "90px",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 32, textAlign: "center" }}>
          Modifica i tuoi dati:
        </h1>

        {/* Form data */}
        <form
          style={{ margin: "16px 0px" }}
          onSubmit={(e) => {
            e.preventDefault();
            EditData();
          }}
        >
          <label className="label-style">Nome visualizzabile</label>
          <input
            type="text"
            className="main-form"
            placeholder="Nome"
            value={data.name}
            onChange={(v) => setData({ ...data, name: v.target.value })}
          ></input>
        </form>
        <div style={{ height: "16px" }} />

        {/* Update data */}
        <button
          onClick={EditData}
          type="submit"
          disabled={IsButtonDisabled()}
          style={{
            width: "100%",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            fontWeight: "500",
            color: IsButtonDisabled() ? "#FFFFFF66" : "white",
            backgroundColor: IsButtonDisabled() ? "#FFFFFF33" : "#B02D23",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loadingEditData ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Aggiorna dati"
          )}
        </button>
      </div>
    </div>
  );
}
