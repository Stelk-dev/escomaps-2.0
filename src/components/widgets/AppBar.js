import React, { useEffect, useRef, useState } from "react";
import { CgMenu, CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import img from "../../assets/escomaps_logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./css/Appbar.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CreditsToShow,
  CurrentUserAdvertiser,
} from "../../providers/AdvertiserUserData";
import { CurrentUser } from "../../providers/ClientUserData";
import { IoMdAddCircleOutline } from "react-icons/io";
import AccountBox from "./boxes/AccountBox";
import AuthUserModal from "../auth/UserLoginSignup";
import SelectCityLocationModal from "../home/widgets/SelectCityLocationModal";

const DefaultAppBar = ({
  showSidebar,
  showMenuIcon,
  showSearchIcon,
  onSearchClick,
  visible,
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginUserModal, setshowLoginUserModal] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [client] = useRecoilState(CurrentUser);
  const [user] = useRecoilState(CurrentUserAdvertiser);
  const credits = useRecoilValue(CreditsToShow);
  const navigate = useNavigate();

  const LogoBox = ({ height = 36 }) => {
    return (
      <Link
        to={user.identityVerified === true ? "/advertiser/ads" : "/"}
        style={{ textDecoration: "none", height: height }}
      >
        <img
          src={img}
          style={{ width: 230, objectFit: "contain" }}
          alt="logo_escort"
        />
      </Link>
    );
  };

  const AuthDesktopBox = () => {
    // Client logged
    if (client.uid.length > 0)
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Name */}
          <div
            style={{ fontWeight: "bold", fontSize: "15px", marginRight: "8px" }}
          >
            #{client.name}
          </div>

          {/* Show dropdown */}
          <AccountBox />
        </div>
      );

    // Advertiser logged
    if (user.uid.length > 0)
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Name + Credits */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Name */}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                marginRight: "8px",
              }}
            >
              {user.name}
            </div>

            {/* Credits */}
            <Link
              to="/buy-credits"
              className="credits-title"
              onClick={() => navigate("/advertiser/ads")}
            >
              <div>
                Crediti:{" "}
                <strong style={{ fontWeight: "bold", color: "#BA68C8" }}>
                  {credits}
                </strong>
              </div>
            </Link>
          </div>

          {/* Show dropdown */}
          <AccountBox />
        </div>
      );

    // No ones logged
    return (
      <div style={{ display: "flex" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <button
            className="desktop-buttons"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup-advertiser");
            }}
            style={{
              backgroundColor: "#9A031E",
              border: "1px solid #B02D23",
            }}
          >
            <IoMdAddCircleOutline className="buttons-icons" />
            <div style={{ fontSize: "14px", marginLeft: "6px" }}>Pubblica</div>
          </button>
        </Link>

        <div style={{ width: "12px" }} />

        <button
          className="desktop-buttons"
          onClick={() => setshowLoginUserModal(true)}
        >
          <CgProfile className="buttons-icons" />
          <div style={{ fontSize: "14px", marginLeft: "6px" }}>Registrati</div>
        </button>
      </div>
    );
  };

  return (
    <div
      className="main-app-bar"
      style={{
        top: visible ? 0 : -100,
        transition: "top 0.3s",
      }}
    >
      {/* App bar */}
      <div className="desktop-app-bar">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px 10px",
            height: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "1324px",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LogoBox />

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0px 32px",
                }}
              >
                <form
                  style={{ flex: 1, position: "relative", maxWidth: "600px" }}
                  action="."
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (querySearch === "") return;
                    navigate("/search?q=" + querySearch);
                    setQuerySearch("");
                  }}
                >
                  <input
                    className="main-form"
                    type="search"
                    id="search"
                    style={{ height: "40px" }}
                    placeholder="Cerca per nome, telefono, città o servizi"
                    value={querySearch}
                    onChange={(v) => setQuerySearch(v.currentTarget.value)}
                  />
                  <AiOutlineSearch
                    onClick={(e) => {
                      e.preventDefault();

                      if (querySearch === "") return;
                      navigate("/search?q=" + querySearch);
                      setQuerySearch("");
                    }}
                    className="search-icon"
                  />
                </form>
              </div>

              {/* Auth buttons */}
              <AuthDesktopBox />
            </div>
          </div>
        </div>

        {/* Sub app bar bar */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1b1b1b",
            padding: "6px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: "1324px",
              width: "100%",
            }}
          >
            <div
              className="dropdown-box"
              style={{ marginRight: "8px" }}
              onClick={() => setShowLocationModal(true)}
            >
              <div>In:</div>
              <div
                style={{
                  fontWeight: "bold",
                  marginLeft: "4px",
                }}
              >
                Parma
              </div>
              <IoIosArrowDown
                fontSize={12}
                style={{
                  display: "flex",
                  marginLeft: "4px",
                }}
              />
            </div>
            <SexFilterDropDown />
          </div>
        </div> */}
      </div>

      {/* Mobile app bar */}
      <div className="mobile-app-bar">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0px 0px",
          }}
        >
          {/* Menu Icon */}
          <button
            style={{
              height: "100%",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={showSidebar}
          >
            {showMenuIcon ? (
              <CgMenu style={{ color: "white", fontSize: 22 }} />
            ) : (
              <div></div>
            )}
          </button>

          {/* Logo */}
          <LogoBox height={40} />

          {/* Search icon */}
          <button
            style={{
              height: "100%",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={onSearchClick}
          >
            {showSearchIcon ? (
              <div>
                <AiOutlineSearch style={{ color: "white", fontSize: 22 }} />
              </div>
            ) : (
              <div></div>
            )}
          </button>
        </div>
      </div>

      {/* Signup/Login user */}
      <AuthUserModal
        open={showLoginUserModal}
        onClose={() => setshowLoginUserModal(false)}
      />

      {/* Find in city */}
      <SelectCityLocationModal
        open={showLocationModal}
        onSelect={(newPos) => {
          console.log(newPos);
        }}
        onClose={() => setShowLocationModal(false)}
      />
    </div>
  );
};

export default function AppBar(props) {
  // Animation
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  // Show search bar
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Hide app bar animation
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos <= 0 ? true : prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    if (!props.hideAnimation) window.addEventListener("scroll", handleScroll);
    else setVisible(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.hideAnimation, prevScrollPos, visible]);

  function SearchBar({ onSearchCancel }) {
    const query = useRef(null);

    // Search function
    function HandleSubmit(e) {
      e.preventDefault();
      if (query === null) return;

      navigate("/search?q=" + query.current.value);
      onSearchCancel();
    }

    return (
      <div className="main-app-bar" style={{ padding: "0px 14px" }}>
        {/* Search form */}
        <form
          onSubmit={HandleSubmit}
          style={{ flex: 1, position: "relative" }}
          action="."
        >
          <input
            ref={query}
            className="main-form"
            style={{ height: "40px" }}
            type="search"
            id="search"
            placeholder="Cerca per nome, telefono, città o servizi"
            autoFocus={true}
          />
          <AiOutlineSearch onClick={HandleSubmit} className="search-icon" />
        </form>

        {/* Cancel button */}
        <button id="cancel-button" onClick={onSearchCancel}>
          Cancella
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar or default app bar */}
      {showSearchBar ? (
        <SearchBar onSearchCancel={() => setShowSearchBar(false)} />
      ) : (
        <DefaultAppBar
          visible={visible}
          showMenuIcon={props.showMenuIcon}
          showSidebar={props.showSidebar}
          showSearchIcon={props.showSearchIcon}
          onSearchClick={() => setShowSearchBar(true)}
        />
      )}
    </div>
  );
}
