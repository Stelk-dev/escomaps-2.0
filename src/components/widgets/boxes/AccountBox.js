import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { styled, alpha } from "@mui/material/styles";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CurrentUser } from "../../../providers/ClientUserData";
import { CurrentUserAdvertiser } from "../../../providers/AdvertiserUserData";
import { SignOut } from "../../../services/Authentication";
import { useNavigate } from "react-router-dom";

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
  }));

  const ItemsUser = () => {
    return [
      <MenuItem
        onClick={() => {
          navigate("/settings-user");
          close();
        }}
      >
        Impostazioni
      </MenuItem>,
      <MenuItem
        onClick={() => {
          SignOut();
          resetUser();

          close();

          navigate("");
        }}
      >
        Esci
      </MenuItem>,
    ];
  };

  const ItemsAdvertiser = () => {
    return [
      <MenuItem
        onClick={() => {
          navigate("/advertiser/settings");
          close();
        }}
      >
        Impostazioni
      </MenuItem>,
      <MenuItem
        onClick={() => {
          SignOut();
          resetAdvertiser();

          close();

          navigate("/");
        }}
      >
        Esci
      </MenuItem>,
    ];
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
