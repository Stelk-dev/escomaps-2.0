import React, { useState } from "react";
import PrefixDropDown from "../../../../widgets/PrefixDropDown";
import CreationAdvBottomBar from "../../../../widgets/CreationAdvBottomBar";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../../../../providers/AdvertiserUserData";
import WhatsappIcon from "../../../../../assets/social-icons/whatsapp.svg";
import TelegramIcon from "../../../../../assets/social-icons/telegram.svg";

export default function CreateAdvPersonalData({ advData, onContinue, onBack }) {
  const [user] = useRecoilState(CurrentUserAdvertiser);
  const [data, setData] = useState({
    name: advData.name ?? user.name ?? "",
    age: advData.age ?? (user.age ?? "").toString(),
    gender: advData.gender ?? user.gender ?? 1,
    phoneNumberPrefix: advData.phoneNumberPrefix ?? user.prefix,
    phoneNumber: advData.phoneNumber ?? user.phoneNumber,
    waNumberPrefix: advData.waNumberPrefix ?? user.prefix,
    waNumber: advData.waNumber ?? "",
    tgNumberPrefix: advData.prefix ?? user.prefix,
    tgNumber: advData.tgNumber ?? "",
  });

  const GenderBox = ({ title, index, isLast = false }) => {
    const selected = data.gender === index;

    return (
      <div
        style={{
          border: "1px solid #9E9E9E",
          borderRadius: "8px",
          backgroundColor: selected ? "white" : "#242424",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 8px",
          marginRight: isLast ? "" : "8px",
          color: selected ? "black" : "grey",
          fontWeight: selected ? "700" : "",
          cursor: "pointer",
        }}
        onClick={() => setData({ ...data, gender: index })}
      >
        {title}
      </div>
    );
  };

  const isButtonActive = () =>
    data.name.length >= 4 &&
    data.age.length >= 2 &&
    parseInt(data.age) >= 18 &&
    data.phoneNumber.length >= 4;

  const onSubmit = () => onContinue(data);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "600", fontSize: "32px" }}>
        Informazioni personali
      </h1>
      <div style={{ color: "grey", textAlign: "center" }}>
        Le seguenti informazioni saranno visibili nell'annuncio
      </div>
      <br />

      {/* Form */}
      <form onSubmit={(v) => onSubmit()}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="label-form">Nome visibile nell'annuncio:</label>
          <input
            className="main-form"
            type="text"
            value={data.name}
            onChange={(event) => {
              const value = event.target.value;
              setData({ ...data, name: value });
            }}
            placeholder="Stefania"
            required
          />
        </div>
        <br />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="label-form">Età:</label>
          <input
            className="main-form"
            type="number"
            placeholder="18"
            value={data.age}
            onChange={(event) => {
              const value = event.target.value;
              // Regular expression to check if the string contains only numbers
              if (/^[0-9]*$/.test(value) && value.length < 3) {
                setData({ ...data, age: value });
              }
            }}
            required
          />
        </div>
        <br />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="label-form">Genere:</label>
          <div style={{ display: "flex" }}>
            <GenderBox title={"Maschio"} index={0} />
            <GenderBox title={"Femmina"} index={1} />
            <GenderBox title={"Trans"} index={2} isLast={true} />
          </div>
        </div>
        <br />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="label-form">Numero di telefono:</label>
          <div style={{ position: "relative" }}>
            <PrefixDropDown
              valueSelected={data.phoneNumberPrefix}
              onChange={(v) =>
                setData({ ...data, phoneNumberPrefix: v.target.value })
              }
            />
            <input
              className="main-form"
              style={{ paddingLeft: "64px" }}
              type="tel"
              placeholder="123456789"
              value={data.phoneNumber}
              onChange={(event) => {
                const value = event.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setData({ ...data, phoneNumber: value });
                }
              }}
              required
            />
          </div>
        </div>
        <br />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="label-form">Whatsapp e telegram (opzionale):</label>
          <div style={{ position: "relative", marginBottom: "8px" }}>
            <PrefixDropDown
              icon={WhatsappIcon}
              valueSelected={data.waNumberPrefix}
              onChange={(v) =>
                setData({ ...data, waNumberPrefix: v.target.value })
              }
            />
            <input
              className="main-form"
              style={{ paddingLeft: "100px" }}
              type="tel"
              placeholder="123456789"
              value={data.waNumber}
              onChange={(event) => {
                const value = event.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setData({ ...data, waNumber: value });
                }
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <PrefixDropDown
              icon={TelegramIcon}
              valueSelected={data.tgNumberPrefix}
              onChange={(v) =>
                setData({ ...data, tgNumberPrefix: v.target.value })
              }
            />
            <input
              className="main-form"
              style={{ paddingLeft: "100px" }}
              type="tel"
              placeholder="123456789"
              value={data.tgNumber}
              onChange={(event) => {
                const value = event.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setData({ ...data, tgNumber: value });
                }
              }}
            />
          </div>
        </div>
      </form>

      <CreationAdvBottomBar
        onContinue={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        isDisabled={!isButtonActive()}
        onBack={onBack}
      />
    </div>
  );
}
