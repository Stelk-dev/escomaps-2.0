import React, { useEffect, useState } from "react";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";
import { MdGpsFixed } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { Checkbox, CircularProgress } from "@mui/material";
import { GetUserPosition } from "../../../../../providers/UserLocation";
import MapView from "../../../../widgets/views/MapView";

export default function CreateAdvLocation({ onContinue, onBack }) {
  const [advData] = useRecoilState(CreationAdvAtom);
  const [latLng, setLatLng] = useState([]);
  const [address, setAddress] = useState(advData.locationData.address ?? "");
  const [locationPublic, setLocationPublic] = useState(
    advData.locationData.locationPublic ?? false
  );
  const [canGoToHomes, setCanGoToHomes] = useState(
    advData.locationData.canGoToHomes ?? true
  );
  const [canReceiveAtHome, setcanReceiveAtHome] = useState(
    advData.locationData.canReceiveAtHome ?? true
  );
  const [loadingLocation, setLoadingLocation] = useState(true);

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
    GetLocation();
    return () => {};
  }, []);

  const GetLocation = () => {
    GetUserPosition(
      (p) => {
        console.log("Success: " + p);
        setLatLng([p.coords.latitude, p.coords.longitude]);
        setLoadingLocation(false);
      },
      (e) => {
        console.log("Error: " + e);
        setLoadingLocation(false);
      }
    );
  };

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
      {loadingLocation || latLng.length === 0 ? (
        <div
          style={{
            height: "260px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #9c9d9c",
            borderRadius: "8px",
            backgroundColor: "#333333",
          }}
        >
          {loadingLocation ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            latLng.length === 0 && (
              <div
                style={{
                  cursor: "pointer",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
                onClick={GetLocation}
              >
                Abilita i permessi per usare la tua posizione corrente
              </div>
            )
          )}
        </div>
      ) : (
        <div style={{ marginBottom: "8px" }}>
          <MapView latLng={latLng} isPositionPublic={true} />
        </div>
      )}

      {/* Form location */}
      <input
        type="text"
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
          value={canReceiveAtHome}
          onClick={() => setcanReceiveAtHome(!canReceiveAtHome)}
        />
        <RowCheckBox
          title={"Mi sposto:"}
          subtitle={
            "Con questa opzione attiva comunichi nell'annuncio che puoi visitare in casa o in Hotel"
          }
          value={canGoToHomes}
          onClick={() => setCanGoToHomes(!canGoToHomes)}
        />
      </div>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onContinue({
            locationData: {
              address: address,
              canGoToHomes: canGoToHomes,
              canReceiveAtHome: canReceiveAtHome,
              lat: latLng[0],
              lon: latLng[1],
              locationPublic: locationPublic,
            },
          });
        }}
        isDisabled={address.length === 0 || latLng.length === 0}
        onBack={onBack}
      />
    </div>
  );
}
