import React from "react";
import { Link } from "react-router-dom";

export default function AdsList({ ads }) {
  return (
    <div className="grid-container">
      {ads.map((a) => (
        <Link
          to={"/adv-detail/" + a}
          style={{ color: "white", textDecoration: "none" }}
        >
          <div key={a} className="grid-item">
            {/* Image */}
            <div className="grid-item-image"></div>

            {/* Description */}
            <div className="grid-item-description">
              <h5 style={{ fontSize: "14px", marginBottom: "2px" }}>
                Caterina, 20
              </h5>
              <p style={{ fontSize: "11px", color: "grey" }}>131,73 km da te</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
