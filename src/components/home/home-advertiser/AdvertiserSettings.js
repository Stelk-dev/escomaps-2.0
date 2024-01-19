import React from "react";
import { SignOut } from "../../../services/Authentication";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaExpeditedssl } from "react-icons/fa6";
import { FaUsersSlash } from "react-icons/fa6";
import { IoNotificationsCircle } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function AdvertiserSettings() {
  const reset = useResetRecoilState(CurrentUserAdvertiser);
  const navigate = useNavigate();

  const SettingBox = ({ leftIcon, name, onPressed }) => {
    return (
      <button className="setting-box-button" onClick={onPressed}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leftIcon && (
            <div
              style={{
                marginRight: "8px",
                fontSize: "22px",
                display: "flex",
              }}
            >
              {leftIcon}
            </div>
          )}
          <div>{name}</div>
        </div>
        <IoIosArrowForward color="#9b9a9b" />
      </button>
    );
  };

  const Divider = () => {
    return (
      <div
        style={{
          height: "32px",
          borderTop: "2px solid #414040",
          borderBottom: "1px solid #414040",
        }}
      ></div>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SettingBox
        leftIcon={<RiMoneyDollarCircleFill color="yellow" />}
        name={"Invita e ricevi 300 crediti subito"}
      />
      <Divider />
      <SettingBox
        leftIcon={<FaUserEdit />}
        name={"Modifica informazioni personali"}
      />
      <SettingBox leftIcon={<FaExpeditedssl />} name={"Email e password"} />
      <Divider />
      <SettingBox leftIcon={<FaUsersSlash />} name={"Utenti bloccati"} />
      <Divider />
      <SettingBox leftIcon={<IoNotificationsCircle />} name={"Notifiche"} />
      <Divider />
      <SettingBox
        name={"Esci"}
        onPressed={() => {
          SignOut();
          reset();

          navigate("/");
        }}
      />
      <SettingBox
        name={"Elimina account"}
        onPressed={() => {
          navigate("/advertiser/settings/delete-account");
        }}
      />
    </div>
  );
}
