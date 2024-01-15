import React, { useRef } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import InstagramIcon from "../../../../../assets/social-icons/instagram.svg";
import OnlyFansIcon from "../../../../../assets/social-icons/onlyfans.svg";
import FacebookIcon from "../../../../../assets/social-icons/facebook.svg";
import TikTokIcon from "../../../../../assets/social-icons/tiktok.svg";

export default function CreateAdvSocials({ onContinue, onBack }) {
  const instagramRef = useRef("");
  const onlyfansRef = useRef("");
  const facebookRef = useRef("");
  const tikTokRef = useRef("");

  const SocialForm = ({ icon, placeholder, controllerRef }) => {
    return (
      <div
        key={placeholder}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={icon} alt="icon-social" style={{ width: "32px" }} />
          <div style={{ marginLeft: "12px" }}>@</div>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="main-form"
          style={{ paddingLeft: "68px" }}
          ref={controllerRef}
        />
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Carica i tuoi social
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Aggiungi i nomi dei tuoi profili socials!
      </div>
      <br />

      <form>
        <SocialForm
          icon={InstagramIcon}
          placeholder={"insta_username"}
          controllerRef={instagramRef}
        />
        <SocialForm
          icon={OnlyFansIcon}
          placeholder={"onlyfans_username"}
          controllerRef={onlyfansRef}
        />
        <SocialForm
          icon={FacebookIcon}
          placeholder={"facebook_username"}
          controllerRef={facebookRef}
        />
        <SocialForm
          icon={TikTokIcon}
          placeholder={"tiktok_username"}
          controllerRef={tikTokRef}
        />
      </form>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({
            instagram: instagramRef.current.value,
            onlyfans: onlyfansRef.current.value,
            facebook: facebookRef.current.value,
            tiktok: tikTokRef.current.value,
          });
        }}
        onBack={onBack}
      />
    </div>
  );
}
