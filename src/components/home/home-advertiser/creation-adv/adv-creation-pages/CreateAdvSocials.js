import React, { useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import InstagramIcon from "../../../../../assets/social-icons/instagram.svg";
import OnlyFansIcon from "../../../../../assets/social-icons/onlyfans.svg";
import FacebookIcon from "../../../../../assets/social-icons/facebook.svg";
import TikTokIcon from "../../../../../assets/social-icons/tiktok.svg";
import { useRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";

export default function CreateAdvSocials({ onContinue, onBack }) {
  const [advData] = useRecoilState(CreationAdvAtom);

  const SocialForm = ({ icon, placeholder, prevalue }) => {
    const [value, setValue] = useState(prevalue);

    const input = (
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
          value={value}
          onChange={(v) => setValue(v.target.value)}
        />
      </div>
    );

    return [value, input];
  };

  const [instagram, instagramInput] = SocialForm({
    icon: InstagramIcon,
    placeholder: "instagram_username",
    prevalue: advData.instagram ?? "",
  });
  const [onlyfans, onlyfansInput] = SocialForm({
    icon: OnlyFansIcon,
    placeholder: "onlyfans_username",
    prevalue: advData.onlyfans ?? "",
  });
  const [facebook, facebookInput] = SocialForm({
    icon: FacebookIcon,
    placeholder: "facebook_username",
    prevalue: advData.instagram ?? "",
  });
  const [tiktok, tiktokInput] = SocialForm({
    icon: TikTokIcon,
    placeholder: "tiktok_username",
    prevalue: advData.instagram ?? "",
  });

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
        {instagramInput}
        {onlyfansInput}
        {facebookInput}
        {tiktokInput}
      </form>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({
            instagram: instagram,
            onlyfans: onlyfans,
            facebook: facebook,
            tiktok: tiktok,
          });
        }}
        onBack={onBack}
      />
    </div>
  );
}
