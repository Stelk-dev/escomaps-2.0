import { SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/escomaps_logo.png";
import "./css/Sidebar.css";
import { CgProfile } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineLanguage, MdContactSupport } from "react-icons/md";
import { BiSolidMap, BiSolidMessageRoundedDetail } from "react-icons/bi";
import { IoDocuments } from "react-icons/io5";
import AuthUserModal from "../auth/AuthUserModal";

export default function Sidebar(props) {
  const [showLoginUserModal, setshowLoginUserModal] = useState(false);

  function SecondaryButton(props) {
    return (
      <button className="secondary-buttons" onClick={() => props.onClick()}>
        {props.icon}

        <div
          style={{
            marginLeft: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div style={{ fontSize: 16 }}>{props.title}</div>

          {/* Description */}
          {props.description != null && (
            <div style={{ paddingTop: 3, fontSize: 12, color: "grey" }}>
              {props.description}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onClose={props.onSidebarClose}
      >
        <div
          style={{
            width: "68vw",
            backgroundColor: "#0d0c0c",
            height: "100vh",
            padding: "0px 8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title and close */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0px",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{ textDecoration: "none", height: 30 }}
              onClick={props.onSidebarClose}
            >
              <img
                src={img}
                style={{ width: 150, objectFit: "contain" }}
                alt="logo_escort"
              />
            </Link>

            {/* Close */}
            <AiFillCloseCircle
              style={{ color: "white", fontSize: 24, cursor: "pointer" }}
              onClick={props.onSidebarClose}
            />
          </div>
          <br />

          {/* Login signup */}
          <div>
            <button
              className="main-buttons"
              onClick={() => {
                setshowLoginUserModal(true);
                props.onSidebarClose();
              }}
            >
              <CgProfile className="buttons-icons" />
              <div className="buttons-text">Entra come utente</div>
            </button>

            <div style={{ padding: "4px 0px" }} />

            <Link
              to="/signup-advertiser"
              style={{ textDecoration: "none", height: 30 }}
            >
              <button className="main-buttons" onClick={props.onSidebarClose}>
                <IoMdAddCircleOutline className="buttons-icons" />
                <div className="buttons-text">Inizia a pubblicare</div>
              </button>
            </Link>
          </div>
          <br />

          <div
            style={{ width: "100%", height: "1px", backgroundColor: "#666666" }}
          />
          <br />

          {/* Options */}
          <SecondaryButton
            title="Lingua"
            description="Italiano"
            icon={<MdOutlineLanguage className="buttons-icons-secondary" />}
            onClick={() => {}}
          />
          <SecondaryButton
            title="Posizione"
            description="-"
            icon={<BiSolidMap className="buttons-icons-secondary" />}
            onClick={() => {}}
          />
          <SecondaryButton
            title="Domande frequenti"
            icon={<MdContactSupport className="buttons-icons-secondary" />}
            onClick={() => {}}
          />
          <SecondaryButton
            title="Contattaci"
            icon={
              <BiSolidMessageRoundedDetail className="buttons-icons-secondary" />
            }
            onClick={() => {}}
          />
          <SecondaryButton
            title="Termini e condizioni"
            icon={<IoDocuments className="buttons-icons-secondary" />}
            onClick={() => {}}
          />
        </div>
      </SwipeableDrawer>

      {/* Signup/Login user */}
      <AuthUserModal
        open={showLoginUserModal}
        onClose={() => setshowLoginUserModal(false)}
      />
    </div>
  );
}
