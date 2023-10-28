import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

export default function HomeAds() {
  const elements = Array.from({ length: 13 }, (_, index) => index + 1);

  return (
    <div style={{ margin: "60px 0px" }}>
      {/* Banners */}
      <div
        style={{
          height: "170px",
          backgroundColor: "red",
          margin: "32px 32px 32px 32px",
        }}
      ></div>

      {/* Advs */}
      <div style={{ padding: "0px 12px" }}>
        {/* Title positon */}
        <div>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "4px",
            }}
          >
            Escort in Milano
          </h1>
          <div style={{ color: "grey", fontSize: "14px" }}>
            Vuoi cercare nella tua zona?{" "}
            <a href="google.com" style={{ color: "red" }}>
              clicca qui
            </a>
          </div>
        </div>
        <div style={{ height: 36 }} />

        {/* Filters */}
        <div>
          <h4
            style={{
              marginBottom: "10px",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Interessato in:
          </h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="filter-button">Donna</div>
            <div className="filter-button">Uomo</div>
            <div className="filter-button">Trans</div>
            <div className="filter-button">Coppia</div>
          </div>
        </div>
        <br />

        {/* List Adv */}
        <div className="grid-container">
          {elements.map((element) => (
            <Link
              to={"/adv-detail/" + element}
              style={{ color: "white", textDecoration: "none" }}
            >
              <div key={element} className="grid-item">
                {/* Image */}
                <div className="grid-item-image"></div>

                {/* Description */}
                <div className="grid-item-description">
                  <h5 style={{ fontSize: "14px", marginBottom: "2px" }}>
                    Caterina, 20
                  </h5>
                  <p style={{ fontSize: "11px", color: "grey" }}>
                    131,73 km da te
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
