import React, { useState } from "react";
import "./css/Home.css";
import AdsList from "./widgets/AdsList";
import SelectableBox from "../widgets/boxes/SelectableBox";
import { FiltersInHome } from "../../constants/ValueConstants";

export default function HomeAds() {
  const elements = Array.from({ length: 13 }, (_, index) => index + 1);
  const [interestedFilters, setInterestedFilters] = useState([]);

  function HandleFilterTap(name) {
    const elementExist = interestedFilters.some((item) => item === name);

    if (elementExist) {
      setInterestedFilters((prev) => [...prev].filter((e) => e !== name));
    } else setInterestedFilters([...interestedFilters, name]);
  }

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
            {FiltersInHome.map((e, index) => (
              <SelectableBox
                name={e}
                key={index}
                onSelect={() => HandleFilterTap(e)}
                isSelected={interestedFilters.includes(e)}
              />
            ))}
          </div>
        </div>
        <br />

        <AdsList ads={elements} />

        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
