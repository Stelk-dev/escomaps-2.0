import React, { useEffect, useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";
import { MdGpsFixed } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { Checkbox, CircularProgress } from "@mui/material";

export default function CreateAdvLocation({ onContinue, onBack }) {
  const [advData] = useRecoilState(CreationAdvAtom);
  const [address, setAddress] = useState(advData.locationData.address ?? "");
  const [locationPublic, setLocationPublic] = useState(
    advData.locationData.locationPublic ?? false
  );
  const [canGoToHome, setCanGoToHome] = useState(
    advData.locationData.canGoToHome ?? true
  );
  const [canReceive, setCanReceive] = useState(
    advData.locationData.canReceive ?? true
  );
  const [loadingLocation] = useState(true);

  const BoxHideShowPosition = ({
    icon,
    title,
    subtitle,
    selected,
    onClick,
  }) => {
    return (
      <div
        style={{
          opacity: selected ? "1" : ".5",
          backgroundColor: "#333333",
          border: "1px solid #9c9d9c",
          borderRadius: "8px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "210px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {icon}
        <div
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "8px",
          }}
        >
          {title}
        </div>
        <div style={{ color: "#FFFFFF88", fontSize: "12px", marginTop: "4px" }}>
          {subtitle}
        </div>
      </div>
    );
  };

  const RowCheckBox = ({ title, subtitle, value, onClick }) => {
    return (
      <div
        style={{ display: "flex", marginBottom: "16px", alignItems: "center" }}
      >
        <div style={{ flex: 3 }}>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{title}</div>
          <div style={{ color: "grey", fontSize: "14px" }}>{subtitle}</div>
        </div>

        <div style={{ flex: 1, textAlign: "end" }}>
          <Checkbox
            checked={value}
            onChange={onClick}
            style={{ color: "white" }}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Call get position
    return () => {};
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Aggiungi posizione
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Aggiungi la posizione del tuo annuncio
      </div>
      <br />

      {/* Map */}
      <div
        style={{
          backgroundColor: "#333333",
          border: "1px solid #9c9d9c",
          borderRadius: "8px",
          height: "270px",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loadingLocation ? (
          <CircularProgress style={{ color: "white" }} />
        ) : (
          <div></div>
        )}
      </div>

      {/* Form location */}
      <input
        className="main-form"
        placeholder="Via Santo Stefano"
        value={address}
        onChange={(v) => setAddress(v.target.value)}
      />
      {/* Public location */}
      <div style={{ display: "flex", marginTop: "8px", marginBottom: "16px" }}>
        <BoxHideShowPosition
          icon={<MdGpsFixed size={48} />}
          selected={locationPublic}
          title={"Posizione precisa"}
          subtitle={
            "Ogni utente potrà vedere l'esatta posizione che hai inserito sulla mappa"
          }
          onClick={() => setLocationPublic(true)}
        />
        <div style={{ margin: "0px 4px" }} />
        <BoxHideShowPosition
          icon={<FaMap size={48} />}
          selected={!locationPublic}
          title={"Posizione approssimata"}
          subtitle={
            "La posizione sarà privata e gli utenti potranno vedere solo la zona"
          }
          onClick={() => setLocationPublic(false)}
        />
      </div>

      {/* Toggle values */}
      <div style={{ padding: "0px 8px" }}>
        <RowCheckBox
          title={"Ricevo a casa:"}
          subtitle={
            "Con questa opzione attiva comunichi nell'annuncio che puoi ricevere nella tua abitazione"
          }
          value={canReceive}
          onClick={() => setCanReceive(!canReceive)}
        />
        <RowCheckBox
          title={"Mi sposto:"}
          subtitle={
            "Con questa opzione attiva comunichi nell'annuncio che puoi visitare in casa o in Hotel"
          }
          value={canGoToHome}
          onClick={() => setCanGoToHome(!canGoToHome)}
        />
      </div>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({
            locationData: {
              address: address,
              canGoToHome: canGoToHome,
              canReceive: canReceive,
              lat: 0,
              lon: 0,
              locationPublic: locationPublic,
            },
          });
        }}
        isDisabled={address.length === 0}
        onBack={onBack}
      />
    </div>
  );
}
