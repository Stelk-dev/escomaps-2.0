import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { IoMdFemale } from "react-icons/io";
import "./css/AdvDetailView.css";

export default function AdvDetailView() {
  const state = useLocation();
  const idAdv = state.pathname.substring(state.pathname.lastIndexOf("/") + 1);

  const [indexPhoto, setIndexPhoto] = useState(0);

  return (
    <div>
      <div style={{height: "58px"}}/>

      {/* Header bar */}
      <div id="header-bar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoMdFemale style={{ color: "white", fontSize: "32px", marginRight: "4px" }} />
          <div>
            <div style={{fontSize: "18px", fontWeight: "600"}}>Caterina, 20</div>
            <div style={{fontSize: "12px", fontWeight: "400", color: "grey"}}>131,73 km da te</div>
          </div>
        </div>

        {/* Favourite */}
        <BsHeart style={{ color: "white", fontSize: "24px" }} />
      </div>

      {/* Black space */}
      <div style={{height: "72px", backgroundColor: "black"}}/>

      {/* Images list */}
      <img src="https://i.scdn.co/image/ab6761610000e5eb3ad3804fd76ae920054fe83b" style={{width: "100%", backgroundColor: "red"}}/>
      <img src="https://i.scdn.co/image/ab6761610000e5eb3ad3804fd76ae920054fe83b" style={{width: "100%", backgroundColor: "red"}}/>
    </div>
  );
}
