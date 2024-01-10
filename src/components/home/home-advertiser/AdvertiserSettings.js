import React from "react";
import { SignOut } from "../../../services/Authentication";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";

export default function AdvertiserSettings() {
  const [, setUser] = useRecoilState(CurrentUserAdvertiser);
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "60px",
      }}
    >
      <button
        style={{ color: "red" }}
        onClick={() => {
          SignOut();
          setUser({});

          navigate("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
}