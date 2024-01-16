import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import "./css/AdvDetailView.css";
import CategoryBox from "../widgets/boxes/CategoryBox";
import MapView from "../widgets/views/MapView";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { Tabs, TabList, Tab } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUserAdvertiser } from "../../providers/AdvertiserUserData";

export default function AdvDetailView({
  defaultAdvValue = null,
  defaultDistanceValue = null,
  isFromEditOrCreation = false,
}) {
  const [advertiser] = useRecoilState(CurrentUserAdvertiser);

  const loc = useLocation();
  const adv = defaultAdvValue ?? loc.state.adv;
  const distanceFromUser = defaultDistanceValue ?? loc.state.distanceFromUser;

  const [indexPhoto, setIndexPhoto] = useState(0);

  const age = adv.age;
  const photos = adv.photos;
  const categories = adv.categories;
  const services = adv.services;
  const typeOfMoving = () => {
    const canReceive = adv.locationData.canReceiveAtHome;
    const canGo = adv.locationData.canGoToHomes;
    var values = ["Ricevo a casa", "Vengo in casa"];

    if (!canReceive && !canGo) values = [];
    else if (!canReceive || !canGo) values = values.slice(1);

    return values;
  };

  const waNumber = adv.whatsapp;
  const tgNumber = adv.telegram;

  function CarouselPhotoElement({ image, index }) {
    return (
      <div
        style={{
          border:
            photos[indexPhoto] === image
              ? "2px white solid"
              : "2px transparent solid",
          borderRadius: "8px",
          width: "60px",
          height: "50px",
          margin: "0px 3px",
        }}
      >
        <img
          src={image}
          alt={"escort_label_" + index}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>
    );
  }

  const handleScroll = (e) => {
    const totalScrollWidth = e.target.scrollWidth - e.target.clientWidth;
    const scrollPercentage = e.target.scrollLeft / totalScrollWidth;
    const activeTabIndex = Math.floor(scrollPercentage * photos.length);
    if (indexPhoto !== activeTabIndex) setIndexPhoto(activeTabIndex);
  };

  const isAdvFromAdvertiser = () =>
    advertiser.adsIds?.includes(adv.idADV) ?? false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Header bar */}
      <div
        id="header-bar"
        style={
          isFromEditOrCreation
            ? {
                position: "absolute",
                maxWidth: "500px",
                borderRadius: "16px 16px 0px 0px",
              }
            : { marginTop: "58px" }
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Sex symbol */}
          {adv.gender === 0 ? (
            <IoMdMale className="sex-symbol-icon" />
          ) : adv.gender === 1 ? (
            <IoMdFemale className="sex-symbol-icon" />
          ) : (
            <IoMdTransgender className="sex-symbol-icon" />
          )}
          <div style={{ marginRight: "8px" }} />

          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "600" }}>
              {adv.name}, {age}
            </h1>
            {!isAdvFromAdvertiser() && (
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "grey",
                  marginLeft: "1px",
                }}
              >
                {distanceFromUser} km da te
              </h2>
            )}
          </div>
        </div>

        {/* Favourite */}
        {!isAdvFromAdvertiser() &&
          (isFromEditOrCreation ? (
            <BsHeart style={{ color: "white", fontSize: "24px" }} />
          ) : (
            <BsHeart style={{ color: "white", fontSize: "24px" }} />
          ))}
      </div>
      {/* Header bar */}

      {/* Chat icons */}
      <div
        id="bottom-bar"
        style={
          isFromEditOrCreation
            ? {
                position: "absolute",
                maxWidth: "500px",
                borderRadius: "0px 0px 16px 16px",
              }
            : {}
        }
      >
        {/* WA */}
        {waNumber && (
          <div
            className="social-circle-button"
            style={{ backgroundColor: "#4caf51" }}
            onClick={() => {
              if (isAdvFromAdvertiser()) return;
              if (isFromEditOrCreation) return;
              window.open("https://wa.me/+39" + waNumber, "_blank");
            }}
          >
            <FaWhatsapp />
          </div>
        )}

        {/* Chat */}
        <div
          className="chat-button"
          style={{ backgroundColor: "white" }}
          onClick={() => {
            if (isAdvFromAdvertiser()) return;
            if (isFromEditOrCreation) return;
            window.open("sms://" + adv.phoneNumber, "_blank");
          }}
        >
          <IoChatbubblesOutline />
        </div>

        {/* Phone */}
        <div
          className="chat-button"
          style={{ backgroundColor: "white" }}
          onClick={() => {
            if (isAdvFromAdvertiser()) return;
            if (isFromEditOrCreation) return;
            window.open("tel:" + adv.phoneNumber, "_blank");
          }}
        >
          <BsTelephoneFill />
        </div>

        {/* TG */}
        {tgNumber && (
          <div
            className="social-circle-button"
            style={{ backgroundColor: "#29b7f7", marginRight: "0px" }}
            onClick={() => {
              if (isAdvFromAdvertiser()) return;
              if (isFromEditOrCreation) return;

              window.open("https://t.me/+39" + tgNumber, "_blank");
            }}
          >
            <FaTelegramPlane />
          </div>
        )}
      </div>

      {/* Black space */}
      <div style={{ height: "72px", backgroundColor: "black" }} />

      {/* All information */}
      <div>
        {/* Images */}
        <div>
          {/* Images carousel */}
          <Tabs aria-label="Scrollable tabs" defaultValue={0}>
            <TabList
              sx={{
                overflow: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                backgroundColor: "black",
                "&::-webkit-scrollbar": { display: "none" },
              }}
              onScroll={handleScroll}
            >
              {photos.map((e, index) => (
                <Tab
                  key={index}
                  sx={{
                    flex: "none",
                    scrollSnapAlign: "start",
                    width: "100%",
                    padding: "0px",
                    border: "none",
                    height: "500px",
                  }}
                >
                  <img
                    src={e}
                    key={index}
                    alt="main_escort_label"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Tab>
              ))}
            </TabList>
          </Tabs>

          {/* Images list */}
          <div
            className="center-class"
            style={{
              flexDirection: "row",
              marginTop: "8px",
            }}
          >
            {photos.map((e, index) => (
              <CarouselPhotoElement image={e} key={index} index={index} />
            ))}
          </div>
        </div>

        {/* Detail ADV */}
        <div style={{ padding: "20px 14px" }}>
          {/* Description */}
          <div
            style={{
              borderRadius: "8px",
              backgroundColor: "#2C2D2C",
              border: "1px #434244 solid",
              padding: "10px",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              {adv.title}
            </h3>
            <p style={{ fontSize: "14px", marginTop: "14px" }}>
              {adv.description}
            </p>
          </div>
          {/* Description */}
          <br />

          {/* Categories */}
          <div>
            <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>Categorie:</h3>

            {/* List categories */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginTop: "8px",
              }}
            >
              {categories.map((c) => (
                <CategoryBox name={c.name} key={c.index} />
              ))}
            </div>
          </div>
          {/* Categories */}

          <br />

          {/* Services */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>Servizi:</h3>

            {/* List services */}
            <div style={{ marginTop: "8px" }}>
              {services.map((s) => (
                <CategoryBox name={s.name} key={s.index} />
              ))}
            </div>
          </div>
          {/* Services */}

          <br />

          {/* Map */}
          <div>
            <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>
              Dove risiedo:
            </h3>
            {/* Webview */}
            <MapView
              latLng={[adv.locationData.lat, adv.locationData.lon]}
              isPositionPublic={adv.locationData.locationPublic}
            />

            {/* Form address */}
            <input
              className="main-form"
              defaultValue={adv.locationData.address}
              style={{
                height: "45px",
                marginTop: "4px",
                color: "white",
                pointerEvents: "none",
              }}
              readOnly={true}
            />

            {/* Type of coming */}
            <div style={{ display: "flex", marginTop: "8px" }}>
              {typeOfMoving().map((e, index) => (
                <div style={{ marginRight: "8px" }} key={index}>
                  <CategoryBox name={e} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra space */}
        <div style={{ height: "100px" }} />
      </div>
    </div>
  );
}
