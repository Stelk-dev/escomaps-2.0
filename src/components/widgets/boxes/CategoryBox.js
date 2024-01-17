import React from "react";

export default function CategoryBox({ name }) {
  return (
    <div
      style={{
        float: "left",
        borderRadius: "32px",
        backgroundColor: "#B02D23",
        padding: "7px 14px",
        fontSize: "14px",
        marginRight: "8px",
        marginBottom: "8px",
      }}
    >
      {name}
    </div>
  );
}
