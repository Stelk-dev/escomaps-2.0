import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CurrentUser } from "../../../../providers/ClientUserData";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SignOut } from "../../../../services/Authentication";
import { IoIosArrowForward } from "react-icons/io";

export default function SettingsUser() {
  const [user] = useRecoilState(CurrentUser);
  const reset = useResetRecoilState(CurrentUser);
  const navigate = useNavigate();

  const SettingBox = ({ leftIcon, name, onPressed, showArrow = true }) => {
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
        {showArrow && <IoIosArrowForward color="#9b9a9b" />}
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
        leftIcon={<FaUserEdit />}
        name={"Modifica informazioni personali"}
        onPressed={() => navigate("/settings-user/edit-information")}
      />
      {user.email.length === 0 && (
        <SettingBox
          leftIcon={<MdOutlineAlternateEmail />}
          name={"Aggiungi email o password"}
          onPressed={() => navigate("/settings-user/add-account")}
        />
      )}
      <Divider />
      <SettingBox
        name={"Esci"}
        onPressed={() => {
          SignOut();
          reset();

          navigate("/");
        }}
        showArrow={false}
      />
    </div>
  );
}
