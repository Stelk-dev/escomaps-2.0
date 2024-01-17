import React, { useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import {
  CreationAdvAtom,
  UploadAdvToDatabase,
} from "../../../../../providers/CreationAdv";
import AdvDetailView from "../../../../adv/AdvDetailView";
import { Timestamp } from "firebase/firestore";
import {
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../../../providers/AdvertiserUserData";
import { useNavigate } from "react-router-dom";

export default function ReviewAdv({ onBack }) {
  const [advertiser, setAdvertiser] = useRecoilState(CurrentUserAdvertiser);
  const [advData] = useRecoilState(CreationAdvAtom);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }

    // Convert the hash to a string (in a base such as 16 for compactness)
    let hashStr = Math.abs(hash).toString(16);

    // Ensure the hash string is 9 characters long
    while (hashStr.length < 9) {
      hashStr = "0" + hashStr; // Pad with zeros if too short
    }
    if (hashStr.length > 9) {
      hashStr = hashStr.substring(0, 9); // Truncate if too long
    }

    return hashStr;
  };

  const navigate = useNavigate();

  async function UploadAdv() {
    setLoadingUpload(true);

    // Set date of publishing and date expired
    const current = new Date();
    const nowDate = new Date(
      current.getFullYear() +
        "/" +
        current.getMonth() +
        1 +
        "/" +
        current.getDate() +
        " " +
        current.getHours() +
        ":" +
        current.getMinutes()
    );
    const timeStampUpload = nowDate.getTime();
    const timeStampExpire =
      nowDate.getTime() + advData.packageSelected.hoursLeft * 3600000;

    const idAdv = hashCode(timeStampUpload.toString());

    await UploadAdvToDatabase(idAdv, {
      ...advData,
      idAdv: idAdv,
      datePublished: new Timestamp(timeStampUpload / 1000, 0),
      dateExpire: new Timestamp(timeStampExpire / 1000, 0),
    });
    await UpdateAdvertiserData(advertiser.uid, {
      ...advertiser,
      adsIds: [...advertiser.adsIds, idAdv],
    });
    setAdvertiser({
      ...advertiser,
      adsIds: [...advertiser.adsIds, idAdv],
      credits: advertiser.credits - advData.packageSelected.totCredits,
    });

    setLoadingUpload(false);

    navigate("/create-adv/upload-success");
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Il tuo annuncio è pronto!
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Assicurati che i dati inseriti siano corretti e clicca su "Pubblica" per
        pubblicarlo. <br /> Ecco come apparirà nella home:
      </div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "650px",
            border: "2px solid white",
            borderRadius: "16px",
            overflowY: "auto",
          }}
        >
          <AdvDetailView
            defaultAdvValue={advData}
            defaultDistanceValue={"1.2"}
            isFromEditOrCreation={true}
          />
        </div>
      </div>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          UploadAdv();
        }}
        isLoading={loadingUpload}
        isPubblish={true}
        onBack={onBack}
      />
    </div>
  );
}
