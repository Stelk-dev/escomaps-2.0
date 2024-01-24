import React from "react";
import "./../css/Boxs.css";

export default function SelectableBox({ name, onSelect, isSelected }) {
  return (
    <div
      className={
        isSelected
          ? "selected mupltiple-filters-button"
          : "mupltiple-filters-button"
      }
      onClick={onSelect}
    >
      {name}
    </div>
  );
}
