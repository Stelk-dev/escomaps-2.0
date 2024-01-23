import { Menu, MenuItem, alpha, styled } from "@mui/material";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { SearchOptions } from "../../../providers/AdsFilters";
import {
  IoIosArrowDown,
  IoMdFemale,
  IoMdMale,
  IoMdTransgender,
} from "react-icons/io";

export default function SexFilterDropDown() {
  const [searchFilters, setSearchFilters] = useRecoilState(SearchOptions);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const SearchItem = ({ title, icon }) => {
    return (
      <MenuItem
        onClick={() => {
          setSearchFilters({ ...searchFilters, findSex: title });
          setAnchorEl(null);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "14px" }}>{title}</div>
          <div>{icon}</div>
        </div>
      </MenuItem>
    );
  };

  return (
    <div>
      {/* Dropdown find  */}
      <div
        className="dropdown-box"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <div>Trova:</div>
        <div style={{ fontWeight: "bold", marginLeft: "4px" }}>
          {searchFilters.findSex}
        </div>
        <IoIosArrowDown
          fontSize={16}
          style={{
            display: "flex",
            marginLeft: "4px",
          }}
        />
      </div>

      {/* Dropdown */}
      <StyledMenu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
      >
        <SearchItem title={"Donna"} icon={<IoMdFemale color="pink" />} />
        <SearchItem title={"Trans"} icon={<IoMdTransgender color="red" />} />
        <SearchItem title={"Uomo"} icon={<IoMdMale color="lightblue" />} />
      </StyledMenu>
    </div>
  );
}
