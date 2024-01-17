import React from "react";
import InstagramIcon from "../../../assets/social-icons/instagram.svg";
import OnlyFansIcon from "../../../assets/social-icons/onlyfans.svg";
import FacebookIcon from "../../../assets/social-icons/facebook.svg";
import TikTokIcon from "../../../assets/social-icons/tiktok.svg";

export default function SocialBox({ socialTitle, socialName }) {
  const SocialIcon = () => {
    var icon = "";

    switch (socialTitle) {
      case "Instagram":
        icon = InstagramIcon;
        break;
      case "OnlyFans":
        icon = OnlyFansIcon;
        break;
      case "Facebook":
        icon = FacebookIcon;
        break;
      case "TikTok":
        icon = TikTokIcon;
        break;
      default:
        icon = InstagramIcon;
        break;
    }

    return <img src={icon} alt="icon-social" style={{ width: "32px" }} />;
  };

  const OpenLink = () => {
    var url = "";

    switch (socialTitle) {
      case "Instagram":
        url = "https://www.instagram.com/" + socialName;
        break;
      case "OnlyFans":
        url = "https://www.onlyfans.com/" + socialName;
        break;
      case "Facebook":
        url = "https://www.facebook.com/" + socialName;
        break;
      case "TikTok":
        url = "https://www.tiktok.com/@" + socialName;
        break;
      default:
        url = "https://www.instagram.com/" + socialName;
        break;
    }

    var win = window.open(url, "_blank");
    win.focus();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#1c1c1c",
        border: "1px solid #474646",
        borderRadius: "12px",
        float: "left",
        padding: "8px",
        marginRight: "8px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
      onClick={OpenLink}
    >
      <SocialIcon />
      <div style={{ marginLeft: "8px" }}>{socialTitle}</div>
    </div>
  );
}
