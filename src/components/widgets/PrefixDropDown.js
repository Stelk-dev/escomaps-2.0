import React from "react";

export default function PrefixDropDown({ valueSelected, onChange }) {
  return (
    <div
      style={{
        position: "absolute",
        fontWeight: "bold",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "8px",
      }}
    >
      <select
        style={{
          fontWeight: "bold",
          color: "white",
          padding: "4px 8px",
          border: "1px solid black",
          borderRadius: "8px",
          backgroundColor: "#333333",
        }}
        value={valueSelected}
        onChange={onChange}
      >
        <option value="+39">+39</option>
        <option value="+44">+44</option>
        <option value="+3">+3</option>
      </select>
    </div>
  );
}
