import React from "react";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";
import { useRecoilState } from "recoil";

export default function HomeAdvertiser() {
  const [user] = useRecoilState(CurrentUserAdvertiser);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "red",
        display: "flex",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Data: {user.email} - {user.name} - {user.age}
    </div>
  );
}
