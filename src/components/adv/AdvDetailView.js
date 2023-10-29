import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { IoMdFemale } from "react-icons/io";
import "./css/AdvDetailView.css";
import CategoryBox from "../widgets/boxes/CategoryBox";
import MapView from "../widgets/views/MapView";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";

export default function AdvDetailView() {
  // const state = useLocation();
  // const idAdv = state.pathname.substring(state.pathname.lastIndexOf("/") + 1);

  const [indexPhoto, setIndexPhoto] = useState(0);

  const photos = [
    "https://i.scdn.co/image/ab6761610000e5eb3ad3804fd76ae920054fe83b",
    "https://insidethemagic.net/wp-content/uploads/2023/04/panda4-800x400.jpg",
    "https://resizing.flixster.com/bUHfz6f5Jl-STdX8vdyauuFMIfY=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzUwMzUyZGMxLTViMjAtNDM5MS04YjhmLTRlNzU1YWNlMzViZS53ZWJw",
  ];
  const categories = ["Donna", "Uomo"];
  const services = ["Anale", "Orale", "Fetish"];
  const address =
    "Via S. Michele Cavana, 48, 43037, Neviano degli Arduini Peloponneso";
  const typeOfMoving = ["Ricevo a casa", "Vengo in casa"];
  const phoneNumber = "+393802640304";
  const waNumber = "3802640304";
  const tgNumber = "3802640304";

  function CarouselPhotoElement({ image, index }) {
    return (
      <div
        style={{
          border:
            photos[indexPhoto] === image
              ? "2px white solid"
              : "2px transparent solid",
          borderRadius: "8px",
          width: "80px",
          height: "55px",
          margin: "0px 3px",
          cursor: "pointer",
        }}
        onClick={() => setIndexPhoto(index)}
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

  return (
    <div>
      <div style={{ height: "58px" }} />

      {/* Chat icons */}
      <div id="bottom-bar">
        {/* WA */}
        <div
          className="social-circle-button"
          style={{ backgroundColor: "#4caf51" }}
          onClick={() => window.open("https://wa.me/+39" + waNumber, "_blank")}
        >
          <FaWhatsapp />
        </div>

        {/* Chat */}
        <div className="chat-button" style={{ backgroundColor: "white" }}>
          <IoChatbubblesOutline />
        </div>

        {/* Phone */}
        <div
          className="chat-button"
          style={{ backgroundColor: "white" }}
          onClick={() => window.open("tel:" + phoneNumber, "_blank")}
        >
          <BsTelephoneFill />
        </div>

        {/* TG */}
        <div
          className="social-circle-button"
          style={{ backgroundColor: "#29b7f7", marginRight: "0px" }}
          onClick={() => window.open("https://t.me/+39" + tgNumber, "_blank")}
        >
          <FaTelegramPlane />
        </div>
      </div>

      {/* Header bar */}
      <div id="header-bar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoMdFemale
            style={{ color: "white", fontSize: "32px", marginRight: "4px" }}
          />
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "600" }}>
              Caterina, 20
            </h1>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "grey",
                marginLeft: "1px",
              }}
            >
              131,73 km da te
            </h2>
          </div>
        </div>

        {/* Favourite */}
        <BsHeart style={{ color: "white", fontSize: "24px" }} />
      </div>
      {/* Header bar */}

      {/* Black space */}
      <div style={{ height: "72px", backgroundColor: "black" }} />

      {/* Images */}
      <div>
        {/* Image */}
        <img
          src={photos[indexPhoto]}
          alt="main_escort_label"
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />

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
            Cilena rossa e disponibile
          </h3>
          <p style={{ fontSize: "14px", marginTop: "14px" }}>
            Foto reale, a casa mia o da te, erotica donna sudamericana, 40 anni,
            caldissima, disponibilità assoluta, preliminari lunghi e al
            naturale, lato b, tutte le posizione, giochi di ruolo, sexy toy,
            dolce o severa padrona, strapon, massaggio prostatico, pioggia
            dorata, tutto con molta calma e pazienza, goditi il piacere di stare
            con una vera donna!
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
            {categories.map((e, index) => (
              <div style={{ marginRight: "8px" }}>
                <CategoryBox name={e} key={index} />
              </div>
            ))}
          </div>
        </div>
        {/* Categories */}

        <br />

        {/* Services */}
        <div>
          <h3 style={{ fontWeight: "bold", fontSize: "14px" }}>Servizi:</h3>

          {/* List services */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              marginTop: "8px",
            }}
          >
            {services.map((e, index) => (
              <div style={{ marginRight: "8px" }}>
                <CategoryBox name={e} key={index} />
              </div>
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
          <MapView latLng={[44.570287, 10.3181128]} isPositionPublic={true} />

          {/* Form address */}
          <input
            className="main-form"
            value={address}
            style={{
              height: "45px",
              marginTop: "4px",
              color: "white",
              pointerEvents: "none",
            }}
            readonly
          />

          {/* Type of coming */}
          <div style={{ display: "flex", marginTop: "8px" }}>
            {typeOfMoving.map((e, index) => (
              <div style={{ marginRight: "8px" }}>
                <CategoryBox name={e} key={index} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "100px" }} />
      </div>
    </div>
  );
}
