import { Modal } from "@mui/joy";
import React, { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import "./../css/SelectCityLocation.css";
import { BsSearchHeart } from "react-icons/bs";

// Appear search button when input is filled
export default function SelectCityLocationModal({ open, onSelect, onClose }) {
  const [searchInput, setSearchInput] = useState(null);
  const cities = [
    "Milano",
    "Roma",
    "Firenze",
    "Torino",
    "Venezia",
    "Parma",
    "Bologna",
    "Palermo",
  ];

  function handleSubmit(value) {
    if(value === "") return;
    
    onSelect(value);
    setSearchInput("");
    onClose();
  }

  const SelectCityElement = ({ name }) => {
    return (
      <div
        style={{
          float: "left",
          width: "23%",
          marginRight: "8px",
          marginBottom: "8px",
        }}
      >
        <button className="location-element" onClick={() => handleSubmit(name)}>
          {name}
        </button>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="center-class"
      style={{ backgroundColor: "#00000077" }}
    >
      <div className="main-modal">
        {/* Cancel icon */}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <MdOutlineClear className="cancel-icon" onClick={onClose} />
        </div>

        {/* Home */}
        <div
          style={{
            padding: "32px 0px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: "18px", marginBottom: "14px" }}>
            Cerca per zona su Escomaps
          </h1>

          {/* Main Input */}
          <form
            onSubmit={(e) => {
              handleSubmit(searchInput);
              e.preventDefault();
            }}
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "14px",
            }}
            action="."
          >
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="main-form"
              style={{ height: "45px" }}
              placeholder="Indirizzo, Città, Provincia..."
              type="search"
              autoFocus={true}
            />

            {/* Search button */}
            <button id="search-button" type="submit" onClick={() => handleSubmit(searchInput)}>
              <BsSearchHeart fontSize="18px" />
              <div style={{ marginLeft: "4px", fontSize: "14px" }}>Cerca</div>
            </button>
          </form>

          {/* Cities list */}
          <div style={{ paddingLeft: "8px" }}>
            {cities.map((e, index) => (
              <SelectCityElement name={e} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
