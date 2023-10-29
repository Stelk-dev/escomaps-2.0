import React from "react";

export default function CategoryBox({ name }) {
  return (
    <div
      style={{
        borderRadius: "32px",
        backgroundColor: "#B02D23",
        padding: "7px 14px",
        fontSize: "14px",
      }}
    >
      {name}
    </div>
  );
}
