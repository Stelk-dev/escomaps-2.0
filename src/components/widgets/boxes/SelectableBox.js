import React from "react";
import "./../css/Boxs.css";

export default function SelectableBox({ name, onSelect, isSelected }) {
  return (
    <div
      className={isSelected ? "selected filter-button" : "filter-button"}
      onClick={onSelect}
    >
      {name}
    </div>
  );
}
