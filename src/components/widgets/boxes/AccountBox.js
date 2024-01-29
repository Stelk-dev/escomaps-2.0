import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { styled, alpha } from "@mui/material/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CurrentUser } from "../../../providers/ClientUserData";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";
import { SignOut } from "../../../services/Authentication";
import { useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { BsPostcardHeartFill } from "react-icons/bs";
import "../css/Boxs.css";

export default function AccountBox() {
  const [user] = useRecoilState(CurrentUser);
  const resetUser = useResetRecoilState(CurrentUser);
  const resetAdvertiser = useResetRecoilState(CurrentUserAdvertiser);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      backgroundColor: "#2c2c2c",
      color: "white",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "#555555",
    },
  }));

  const ItemsUser = () => {
    return [
      <CustomMenuItem
        title={"Preferiti"}
        icon={<AiFillHeart />}
        onClick={() => {
          navigate("/favourites-user");
          close();
        }}
      />,
      <CustomMenuItem
        title={"Impostazioni"}
        icon={<IoIosSettings />}
        onClick={() => {
          navigate("/settings-user");
          close();
        }}
      />,
      <CustomMenuItem
        title={"Esci"}
        icon={<TbLogout2 />}
        onClick={() => {
          SignOut();
          resetUser();

          close();

          navigate("");
        }}
      />,
    ];
  };

  const ItemsAdvertiser = () => {
    return [
      <CustomMenuItem
        title={"Annunci"}
        icon={<AiFillHome />}
        onClick={() => {
          navigate("/advertiser");
          close();
        }}
      />,
      <CustomMenuItem
        title={"I tuoi annunci"}
        icon={<BsPostcardHeartFill />}
        onClick={() => {
          navigate("/advertiser/ads");
          close();
        }}
      />,
      <CustomMenuItem
        title={"Impostazioni"}
        icon={<IoIosSettings />}
        onClick={() => {
          navigate("/advertiser/settings");
          close();
        }}
      />,
      <CustomMenuItem
        title={"Esci"}
        icon={<TbLogout2 />}
        onClick={() => {
          SignOut();
          resetAdvertiser();

          close();

          navigate("/");
        }}
      />,
    ];
  };

  const CustomMenuItem = ({ icon, title, onClick }) => {
    return (
      <MenuItem onClick={onClick}>
        <div style={{ marginRight: "10px" }}>{icon}</div>
        <div style={{ fontSize: "15px" }}>{title}</div>
      </MenuItem>
    );
  };

  return (
    <div>
      {/* User icon */}
      <FaCircleUser
        color="white"
        size={32}
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      />

      {/* Dropdown */}
      <StyledMenu anchorEl={anchorEl} open={anchorEl !== null} onClose={close}>
        {user.uid === "" ? <ItemsAdvertiser /> : <ItemsUser />}
      </StyledMenu>
    </div>
  );
}
