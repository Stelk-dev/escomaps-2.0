import { SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/escomaps_logo.png";
import "./css/Sidebar.css";
import { CgProfile } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { BiSolidMap, BiSolidMessageRoundedDetail } from "react-icons/bi";
import { IoDocuments } from "react-icons/io5";
import AuthUserModal from "../auth/UserLoginSignup";
import { MdPrivacyTip } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetUserPosition, UserLocation } from "../../providers/UserLocation";
import {
  CreditsToShow,
  CurrentUserAdvertiser,
} from "../../providers/AdvertiserUserData";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { CurrentUser } from "../../providers/ClientUserData";
import { IoSettingsOutline } from "react-icons/io5";
import SelectCityLocationModal from "../home/widgets/SelectCityLocationModal";

export default function Sidebar(props) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginUserModal, setshowLoginUserModal] = useState(false);
  const [position, setPosition] = useRecoilState(UserLocation);
  const navigate = useNavigate();

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
          <div style={{ fontSize: "16px", textAlign: "start" }}>
            {props.title}
          </div>

          {/* Description */}
          {props.description != null && (
            <div style={{ fontSize: 12, color: "grey" }}>
              {props.description}
            </div>
          )}
        </div>
      </button>
    );
  }

  const [client] = useRecoilState(CurrentUser);
  const [user] = useRecoilState(CurrentUserAdvertiser);
  const credits = useRecoilValue(CreditsToShow);

  function PathForSignupAdvertiser() {
    if (user.email.length === 0) return "/signup-advertiser";

    if (!user.emailVerified) return "/signup-advertiser-verify-email";

    if (user.name.length === 0) return "/signup-advertiser-add-data";

    if (!user.identityVerified) return "/signup-advertiser-verify-identity";

    return null;
  }

  const LoginSignup = () => {
    return (
      <div>
        <Link
          to={PathForSignupAdvertiser()}
          style={{ textDecoration: "none", height: 30 }}
        >
          <button
            className="main-buttons"
            onClick={props.onSidebarClose}
            style={{
              backgroundColor: "#9A031E",
              border: "1px solid #B02D23",
            }}
          >
            <IoMdAddCircleOutline className="buttons-icons" />
            <div className="buttons-text">Inizia a pubblicare</div>
          </button>
        </Link>

        <div style={{ padding: "4px 0px" }} />
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
      </div>
    );
  };

  const AdvertiserBox = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {/* User icon */}
        <FaCircleUser color="white" size={54} />

        <div style={{ marginTop: "8px", fontSize: "18px", fontWeight: "600" }}>
          {user.name}
        </div>

        {/* Credits */}
        <Link
          to="/buy-credits"
          style={{ color: "white", textDecoration: "none" }}
          onClick={props.onSidebarClose}
        >
          <div style={{ fontSize: "16px" }}>
            Crediti:{" "}
            <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
              {credits}
            </strong>
          </div>
        </Link>

        <br />

        {/* Buttons */}
        <button
          className="main-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            navigate("/create-adv");
            props.onSidebarClose();
          }}
        >
          <IoMdAddCircleOutline className="buttons-icons" />
          <div className="buttons-text">Pubblica annuncio</div>
        </button>
        <div style={{ margin: "4px 0px" }} />
        <button
          className="main-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            navigate("/buy-credits");
            props.onSidebarClose();
          }}
        >
          <FiShoppingCart className="buttons-icons" />
          <div className="buttons-text">Compra crediti</div>
        </button>
      </div>
    );
  };

  const UserBox = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {/* User icon */}
        <FaCircleUser color="white" size={54} />

        <div
          style={{
            margin: "8px 0px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          #{client.name}
        </div>

        {/* Buttons */}
        <button
          className="main-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            navigate("/settings-user");
            props.onSidebarClose();
          }}
        >
          <IoSettingsOutline className="buttons-icons" />
          <div className="buttons-text">Impostazioni</div>
        </button>
      </div>
    );
  };

  function HeaderSideBar() {
    // Client user header
    if (client.uid.length > 0) return <UserBox />;

    // Advertiser user finished signup
    if (PathForSignupAdvertiser() === null) return <AdvertiserBox />;

    return <LoginSignup />;
  }

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onOpen={props.onSidebarOpen}
        onClose={props.onSidebarClose}
      >
        <div
          style={{
            width: "68vw",
            backgroundColor: "black",
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
              to={
                client.uid.length > 0 || PathForSignupAdvertiser() != null
                  ? "/"
                  : "/advertiser/ads"
              }
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

          {/* User tab Login & signup */}
          {HeaderSideBar()}
          <br />

          <div
            style={{ width: "100%", height: "1px", backgroundColor: "#666666" }}
          />
          <br />

          {/* Options */}
          {/* <SecondaryButton
            title="Lingua"
            description="Italiano"
            icon={<MdOutlineLanguage className="buttons-icons-secondary" />}
            onClick={() => {}}
          /> */}
          <SecondaryButton
            title="Posizione"
            description={
              position.regionName === null
                ? "Attiva posizione"
                : position.regionName
            }
            icon={<BiSolidMap className="buttons-icons-secondary" />}
            onClick={() => {
              if (position.regionName === null)
                GetUserPosition().then((position) => {
                  if (position === null) return;

                  setPosition(position);
                });
              else setShowLocationModal(true);
            }}
          />
          <SecondaryButton
            title="Domande frequenti"
            icon={<MdContactSupport className="buttons-icons-secondary" />}
            onClick={() => {
              navigate("/faq");
              props.onSidebarClose();
            }}
          />
          <SecondaryButton
            title="Contattaci"
            icon={
              <BiSolidMessageRoundedDetail className="buttons-icons-secondary" />
            }
            onClick={() => {
              navigate("/contact-us");
              props.onSidebarClose();
            }}
          />

          {/* Last options */}
          <SecondaryButton
            title="Termini e condizioni"
            icon={<IoDocuments className="buttons-icons-secondary" />}
            onClick={() => {
              navigate("/terms-and-conditions");
              props.onSidebarClose();
            }}
          />
          <SecondaryButton
            title="Privacy policy"
            icon={<MdPrivacyTip className="buttons-icons-secondary" />}
            onClick={() => {
              navigate("/privacy-policy");
              props.onSidebarClose();
            }}
          />
        </div>
      </SwipeableDrawer>

      {/* Signup/Login user */}
      <AuthUserModal
        open={showLoginUserModal}
        onClose={() => setshowLoginUserModal(false)}
      />

      {/* Select location dialog */}
      <SelectCityLocationModal
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </div>
  );
}
