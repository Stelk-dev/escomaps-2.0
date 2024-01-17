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

export default function ReviewAdv({ onBack }) {
  const [advertiser, setAdvertiser] = useRecoilState(CurrentUserAdvertiser);
  const [advData, setAdvData] = useRecoilState(CreationAdvAtom);
  const [loadingUpload, setLoadingUpload] = useState(false);

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

    // TODOs: hashcode done
    const idAdv = "idadv-custom-for-now";

    setAdvData({
      ...advData,
      idAdv: idAdv,
      datePublished: new Timestamp(timeStampUpload / 1000, 0),
      dateExpire: new Timestamp(timeStampExpire / 1000, 0),
    });

    await UploadAdvToDatabase(idAdv, advData);
    await UpdateAdvertiserData(advertiser.uid, {
      ...advertiser,
      adsIds: [...advertiser.adsIds, idAdv],
    });
    setAdvertiser({ ...advertiser, adsIds: [...advertiser.adsIds, idAdv] });

    // TODOs: show success screen
    setLoadingUpload(false);
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
