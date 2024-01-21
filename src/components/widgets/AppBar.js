import React, { useEffect, useRef, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import img from "../../assets/escomaps_logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./css/Appbar.css";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../providers/AdvertiserUserData";

const DefaultAppBar = ({
  showSidebar,
  showMenuIcon,
  showSearchIcon,
  onSearchClick,
  visible,
}) => {
  const [user] = useRecoilState(CurrentUserAdvertiser);

  return (
    <div
      className="main-app-bar"
      style={{
        top: visible ? 0 : -100,
        transition: "top 0.3s",
      }}
    >
      {/* Menu */}
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
          marginLeft: "8px",
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
      <Link
        to={user.identityVerified === true ? "/advertiser/ads" : "/"}
        style={{ textDecoration: "none", height: 30 }}
      >
        <img
          src={img}
          style={{ width: 180, objectFit: "contain" }}
          alt="logo_escort"
        />
      </Link>

      {/* Search icon */}
      <button
        style={{
          height: "100%",
          width: "60px",
          marginRight: "8px",
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
  );
};

function SearchBar({ onSearchCancel }) {
  const navigate = useNavigate();
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
          type="search"
          id="search"
          placeholder="Cerca per nome, telefono, città..."
          autoFocus={true}
          style={{ height: "45px", paddingRight: "50px" }}
        />
        <AiOutlineSearch
          onClick={HandleSubmit}
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "0px 6px 6px 0px",
            width: "44px",
            padding: "12px",
            position: "absolute",
            right: "1px",
            top: "1px",
            height: "97%",
          }}
        />
      </form>

      {/* Cancel button */}
      <button id="cancel-button" onClick={onSearchCancel}>
        Cancella
      </button>
    </div>
  );
}

export default function AppBar(props) {
  // Animation
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  // Show search bar
  const [showSearchBar, setShowSearchBar] = useState(false);

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
