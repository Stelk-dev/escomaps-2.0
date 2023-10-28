import React, { useEffect, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import img from "../../assets/escomaps_logo.png";
import { Link } from "react-router-dom";
import "./css/Appbar.css";

export default function AppBar(props) {
  // Animation
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <div id="main-app-bar" style={{ top: visible ? 0 : -100, transition: 'top 0.3s' }}>
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
