import React from "react";

export default function PrefixDropDown({
  icon = null,
  valueSelected,
  onChange,
}) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "8px",
        height: "100%",
      }}
    >
      {/* Whatsapp or telegram */}
      {icon && (
        <img
          src={icon}
          alt="icon-social"
          style={{ width: "24px", marginRight: "8px", marginLeft: "4px" }}
        />
      )}

      {/* Drop down */}
      <div
        style={{
          fontWeight: "bold",
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
    </div>
  );
}
