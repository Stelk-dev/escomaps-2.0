import React from "react";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  BsChatSquareDots,
  BsFillChatSquareDotsFill,
  BsPostcardHeart,
  BsPostcardHeartFill,
} from "react-icons/bs";
import "./css/BottomBar.css";
import { Link, useLocation } from "react-router-dom";
import { PiChatsCircleLight, PiChatsCircleFill } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";

export default function BottomBar({ isAdvertiser }) {
  const userLocation = useLocation();

  //Element at bottom bar
  function BottomElement({ Icon, FilledIcon, title, path }) {
    const isSamePath = userLocation.pathname === path;
    return (
      <Link
        to={path}
        className="bottom-element"
        style={{ opacity: isSamePath ? "1" : ".5" }}
      >
        {isSamePath ? FilledIcon : Icon}
        <div style={{ fontSize: "12px", marginTop: "4px" }}>{title}</div>
      </Link>
    );
  }

  const ElementsBottomBar = () => {
    if (isAdvertiser)
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "black",
            width: "100vw",
          }}
        >
          <BottomElement
            FilledIcon={<AiFillHome className="bottom-icon" />}
            Icon={<AiOutlineHome className="bottom-icon" />}
            title="Home"
            path="/advertiser"
          />
          <BottomElement
            FilledIcon={<PiChatsCircleFill className="bottom-icon" />}
            Icon={<PiChatsCircleLight className="bottom-icon" />}
            title="Chats"
            path="/advertiser/chats"
          />
          <BottomElement
            FilledIcon={<BsPostcardHeartFill className="bottom-icon" />}
            Icon={<BsPostcardHeart className="bottom-icon" />}
            title="Annunci"
            path="/advertiser/ads"
          />
          <BottomElement
            FilledIcon={<IoIosSettings className="bottom-icon" />}
            Icon={<CiSettings className="bottom-icon" />}
            title="Impostazioni"
            path="/advertiser/settings"
          />
        </div>
      );

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "black",
          width: "100vw",
        }}
      >
        <BottomElement
          FilledIcon={<AiFillHome className="bottom-icon" />}
          Icon={<AiOutlineHome className="bottom-icon" />}
          title="Home"
          path="/"
        />
        <BottomElement
          FilledIcon={<BsFillChatSquareDotsFill className="bottom-icon" />}
          Icon={<BsChatSquareDots className="bottom-icon" />}
          title="Chat"
          path="/chats-user"
        />
        <BottomElement
          FilledIcon={<AiFillHeart className="bottom-icon" />}
          Icon={<AiOutlineHeart className="bottom-icon" />}
          title="Preferiti"
          path="/favourites-user"
        />
      </div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
      }}
    >
      <ElementsBottomBar />
    </div>
  );
}
