import React, { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
import SocialBox from "../widgets/boxes/SocialBox";
import { GetDistanceFromAdv, UserLocation } from "../../providers/UserLocation";
import AuthUserModal from "../auth/UserLoginSignup";
import { CurrentUser, UpdateUserData } from "../../providers/ClientUserData";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

export default function AdvDetailView({
  defaultAdvValue = null,
  isFromEditOrCreation = false,
}) {
  // Tab list ref
  const tabsRef = useRef([]);

  const [clientUser, setClientUser] = useRecoilState(CurrentUser);
  const [advertiser] = useRecoilState(CurrentUserAdvertiser);
  const [showLoginUserModal, setshowLoginUserModal] = useState(false);

  const loc = useLocation();
  const adv = defaultAdvValue ?? loc.state.adv;

  const [location] = useRecoilState(UserLocation);
  const DistanceFromUser = () => {
    return GetDistanceFromAdv({
      userLatitude: location.latitude,
      userLongitude: location.longitude,
      advLatitude: adv.locationData.lat,
      advLongitude: adv.locationData.lon,
    });
  };

  const [indexPhoto, setIndexPhoto] = useState(0);

  const age = adv.age;
  const photos = adv.photos;
  const categories = adv.categories;
  const services = adv.services;
  const TypeOfMoving = () => {
    const canReceive = adv.locationData.canReceiveAtHome;
    const canGo = adv.locationData.canGoToHomes;
    var values = ["Ricevo a casa", "Vengo in casa"];

    if (!canReceive && !canGo) values = [];
    else if (!canReceive || !canGo) values = values.slice(1);

    return values;
  };

  const SocialList = () => {
    const socials = [];

    if (adv.instagram !== null && adv.instagram.length > 0)
      socials.push({ social: "Instagram", link: adv.instagram });

    if (adv.onlyfans !== null && adv.onlyfans.length > 0)
      socials.push({ social: "OnlyFans", link: adv.onlyfans });

    if (adv.facebook !== null && adv.facebook.length > 0)
      socials.push({ social: "Facebook", link: adv.facebook });

    if (adv.tiktok !== null && adv.tiktok.length > 0)
      socials.push({ social: "TikTok", link: adv.tiktok });

    return socials;
  };

  const waNumber = adv.waNumberPrefix + adv.waNumber;
  const tgNumber = adv.tgNumberPrefix + adv.tgNumber;

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
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.preventDefault();
          tabsRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
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
    advertiser.adsIds?.includes(adv.idAdv) ?? false;

  useEffect(() => {
    // Get adv data if adv is null
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ marginTop: isFromEditOrCreation ? "" : "68px" }}>
      {/* Chat icons */}
      <div
        id="bottom-bar"
        style={
          isFromEditOrCreation
            ? {
                position: "absolute",
                width: "99%",
                maxWidth: "496px",
                bottom: 2,
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
              window.open("https://wa.me/" + waNumber, "_blank");
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

              window.open("https://t.me/" + tgNumber, "_blank");
            }}
          >
            <FaTelegramPlane />
          </div>
        )}
      </div>

      {/* All information */}
      <div>
        {/* Images carousel */}
        <div>
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
                  ref={(el) => (tabsRef.current[index] = el)}
                >
                  {/* Image */}
                  <img
                    src={e}
                    key={index}
                    alt="main_escort_label"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "#111111",
                    }}
                  />
                </Tab>
              ))}
            </TabList>

            {/* Left scroller */}
            <div
              className="scroller-arrow"
              style={{
                left: 0,
              }}
              onClick={(e) => {
                e.preventDefault();

                var indexToScroll = indexPhoto - 1;
                if (indexToScroll < 0)
                  indexToScroll = tabsRef.current.length - 1;

                tabsRef.current[indexToScroll].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "start",
                });
              }}
            >
              <MdArrowBackIosNew />
            </div>

            {/* Right scroller */}
            <div
              className="scroller-arrow"
              style={{
                right: 0,
              }}
              onClick={(e) => {
                e.preventDefault();
                var indexToScroll = indexPhoto + 1;
                if (indexToScroll > tabsRef.current.length - 1)
                  indexToScroll = 0;
                tabsRef.current[indexToScroll].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "start",
                });
              }}
            >
              <MdArrowForwardIos />
            </div>

            {/* Favourite */}
            {!isAdvFromAdvertiser() && (
              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  padding: "16px",
                  zIndex: "1",
                }}
                onClick={() => {
                  if (isFromEditOrCreation) return;

                  if (clientUser.uid.length === 0) {
                    setshowLoginUserModal(true);
                    return;
                  }

                  // Save to favourite
                  var fvAds = clientUser.favouritesAds;
                  if (clientUser.favouritesAds.includes(adv.idAdv))
                    fvAds = fvAds.filter((v) => v !== adv.idAdv);
                  else fvAds = [...clientUser.favouritesAds, adv.idAdv];

                  setClientUser({
                    ...clientUser,
                    favouritesAds: fvAds,
                  });
                  UpdateUserData(clientUser.uid, {
                    favouritesAds: fvAds,
                  });
                }}
              >
                {isFromEditOrCreation ? (
                  <FaHeart className="favourite-icon" />
                ) : clientUser.favouritesAds.includes(adv.idAdv) ? (
                  <FaHeart className="favourite-icon" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </div>
            )}
          </Tabs>

          {/* Images list */}
          <div
            className="center-class"
            style={{
              flexDirection: "row",
              marginTop: "8px",
              padding: "0px 12px",
            }}
          >
            {photos.map((e, index) => (
              <CarouselPhotoElement image={e} key={index} index={index} />
            ))}
          </div>
        </div>

        {/* Detail ADV */}
        <div style={{ margin: "20px 14px" }}>
          {/* Name, age, sex */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: "#2C2D2C",
              border: "1px #434244 solid",
              padding: "14px",
              marginBottom: "12px",
            }}
          >
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
                  {DistanceFromUser()} km da te
                </h2>
              )}
            </div>

            {adv.gender === 0 ? (
              <IoMdMale className="sex-symbol-icon" />
            ) : adv.gender === 1 ? (
              <IoMdFemale className="sex-symbol-icon" />
            ) : (
              <IoMdTransgender className="sex-symbol-icon" />
            )}
          </div>

          {/* Description */}
          <div
            style={{
              borderRadius: "8px",
              backgroundColor: "#2C2D2C",
              border: "1px #434244 solid",
              padding: "14px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              {adv.title}
            </h3>
            <div style={{ fontSize: "14px", marginTop: "14px" }}>
              {adv.description}
            </div>
          </div>
          {/* Description */}

          {/* Categories */}
          <div style={{ marginBottom: "20px" }}>
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
                <CategoryBox name={c} key={c} />
              ))}
            </div>
          </div>
          {/* Categories */}

          {/* Services */}
          {services.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>Servizi:</h3>

              {/* List services */}
              <div style={{ marginTop: "8px" }}>
                {services.map((s) => (
                  <CategoryBox name={s} key={s} />
                ))}
              </div>
            </div>
          )}
          {/* Services */}

          {/* Map */}
          <div>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
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
                marginTop: "8px",
                color: "white",
                pointerEvents: "none",
              }}
              readOnly={true}
            />

            {/* Type of coming */}
            <div
              style={{
                display: "flex",
                marginTop: "8px",
                marginBottom: "20px",
              }}
            >
              {TypeOfMoving().map((e) => (
                <CategoryBox name={e} key={e} />
              ))}
            </div>
          </div>

          {/* Social list */}
          {SocialList().length > 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Link social:
              </h3>
              {/* Type of coming */}
              <div
                style={{
                  marginTop: "8px",
                }}
              >
                {SocialList().map((e) => (
                  <SocialBox
                    socialName={e.link}
                    socialTitle={e.social}
                    key={e.social}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extra space */}
        <div style={{ height: "80px" }} />
      </div>

      {/* Signup/Login user */}
      <AuthUserModal
        open={showLoginUserModal}
        onClose={() => setshowLoginUserModal(false)}
      />
    </div>
  );
}
