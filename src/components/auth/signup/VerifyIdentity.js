import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import {
  CurrentUserAdvertiser,
  UpdateAdvertiserData,
} from "../../../providers/AdvertiserUserData";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function VerifyIdentity() {
  const [currentUser] = useRecoilState(CurrentUserAdvertiser);
  const [documentsData, setDocumentsData] = useState({
    front: null,
    back: null,
  });
  const navigate = useNavigate();

  const DocumentBox = ({ addPaddingRight, frontOrBack }) => {
    return (
      <div
        style={{
          marginRight: addPaddingRight && "8px",
          height: "200px",
          flex: 1,
          backgroundColor: "grey",
          border: "2px solid #AAAAAA",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        {/* Front or back */}
        <div
          style={{
            backgroundColor: "#33333388",
            color: "#FFFFFF88",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontWeight: "bold",
            height: "100%",
            fontSize: "32px",
          }}
        >
          {frontOrBack ? "Fronte" : "Retro"}
        </div>

        {/* X Icon */}
        <div
          onClick={() => {
            if (frontOrBack)
              setDocumentsData({ ...documentsData, front: null });
            else setDocumentsData({ ...documentsData, back: null });
          }}
          style={{
            borderRadius: "100%",
            width: "32px",
            height: "32px",
            border: "2px solid black",
            backgroundColor: "white",
            position: "absolute",
            right: "-10px",
            top: "-15px",
          }}
        >
          <TiDelete color="black" size={24} />
        </div>

        {/* Image */}
        <img
          src={frontOrBack ? documentsData.front : documentsData.back}
          alt="identity-box"
          width="100%"
          height="100%"
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </div>
    );
  };

  function UploadImage(event) {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    if (documentsData.front === null) {
      setDocumentsData({ ...documentsData, front: imageUrl });
      URL.revokeObjectURL(documentsData.front);
    } else {
      setDocumentsData({ ...documentsData, back: imageUrl });
      URL.revokeObjectURL(documentsData.back);
    }
  }

  async function Continue() {
    // Upload to storage on FB
    await UpdateAdvertiserData(currentUser.uid, { identityVerified: true });

    navigate("/advertiser/ads");
  }

  return (
    <div className="main-div" style={{ height: "100vh" }}>
      <div className="main-div" style={{ width: "100vw", maxWidth: "600px" }}>
        <h1 style={{ fontWeight: "600", fontSize: 40, textAlign: "center" }}>
          Conferma identità
        </h1>
        <div
          style={{
            marginTop: "12px",
            color: "#FFFFFFEE",
            fontWeight: "200",
            fontSize: 18,
            padding: "0px 32px",
            textAlign: "center",
          }}
        >
          <div>
            Carica il fronte e retro di un documento di identità valido. Sono
            valido solo:{" "}
            <strong style={{ fontWeight: "bold" }}>
              cartà di identità; passaporto
            </strong>
          </div>

          <div
            style={{ display: "flex", marginTop: "32px", marginBottom: "48px" }}
          >
            {documentsData.front && (
              <DocumentBox addPaddingRight={true} frontOrBack={true} />
            )}
            {documentsData.back && <DocumentBox frontOrBack={false} />}
          </div>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={UploadImage}
            accept="image/*"
          />

          <button
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
            type="submit"
            style={{
              width: "100%",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              fontWeight: "500",
              color: "white",
              backgroundColor: "#4D4D4D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Carica documenti
          </button>

          {documentsData.front !== null && documentsData.back !== null && (
            <button
              onClick={Continue}
              type="submit"
              style={{
                marginTop: "14px",
                width: "100%",
                border: "none",
                padding: "12px",
                borderRadius: "4px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#B02D23",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Avanti
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
