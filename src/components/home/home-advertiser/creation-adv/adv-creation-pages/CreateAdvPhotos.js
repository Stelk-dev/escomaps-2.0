import React, { useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { MdCloudUpload } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function CreateAdvPhotos({ onContinue, onBack }) {
  const [photos, setPhotos] = useState([]);

  const ImageBox = ({ path, index }) => {
    return (
      <div
        style={{
          marginRight: "20px",
          marginBottom: "20px",
          height: "220px",
          width: "139px",
          float: "left",
          backgroundColor: "grey",
          border: "2px solid #AAAAAA",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        {/* X Icon */}
        <div
          onClick={() => {
            setPhotos(photos.filter((e, i) => i !== index));
          }}
          style={{
            borderRadius: "100%",
            padding: "2px",
            border: "2px solid black",
            backgroundColor: "white",
            position: "absolute",
            right: "-10px",
            top: "-15px",
            cursor: "pointer",
          }}
        >
          <TiDelete color="black" size={26} />
        </div>

        {/* Image */}
        <img
          src={path}
          alt={"photo-" + index}
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setPhotos([...photos, reader.result]);
    };
  }

  const UploadDisabled = () => photos.length === 8;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Carica foto
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Scegli le tue foto migliori da caricare! (minimo 3 foto)
      </div>
      <br />

      {/* List of images */}
      {photos.length > 0 && (
        <div
          style={{
            marginTop: "32px",
            marginBottom: "48px",
            backgroundColor: "#1c1c1c",
            border: "1px solid #474646",
            borderRadius: "12px",
            padding: "20px 0px 0px 20px",
          }}
        >
          {photos.map((e, i) => (
            <ImageBox key={i} index={i} path={e} />
          ))}
        </div>
      )}

      {/* Upload images */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={UploadImage}
        style={{ display: "none" }}
      />
      <button
        onClick={() => document.getElementById("fileInput").click()}
        disabled={UploadDisabled()}
        style={{
          border: "none",
          backgroundColor: UploadDisabled() ? "#FFFFFF33" : "#007DFF",
          color: UploadDisabled() ? "#FFFFFF66" : "white",
          width: "100%",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <MdCloudUpload size={32} />
        <div style={{ fontSize: "20px" }}>Carica foto</div>
      </button>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({ photos: photos });
        }}
        isDisabled={photos.length < 3}
        onBack={onBack}
      />
    </div>
  );
}
