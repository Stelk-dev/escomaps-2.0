import React from "react";
import { CgMenu } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import img from "../../assets/escomaps_logo.png";
import { Link } from "react-router-dom";
import "./css/Appbar.css";

export default function AppBar(props) {
  return (
    <div id="main-app-bar">
      {/* Menu */}
      {props.showMenuIcon ? (
        <CgMenu
          style={{ color: "white", fontSize: 22, cursor: "pointer" }}
          onClick={props.showSidebar}
        />
      ) : (
        <div></div>
      )}

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", height: 30 }}>
        <img
          src={img}
          style={{ width: 180, objectFit: "contain" }}
          alt="logo_escort"
        />
      </Link>

      {/* Search icon */}
      {props.showSearchIcon ? (
        <AiOutlineSearch style={{ color: "white", fontSize: 22 }} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
