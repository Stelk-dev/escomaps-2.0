import React, { useState, useEffect } from "react";
import "./css/Home.css";
import AdsList from "./widgets/AdsList";
import SelectableBox from "../widgets/boxes/SelectableBox";
import { FiltersInHome } from "../../constants/ValueConstants";
import { useRecoilState } from "recoil";
import {
  GetUserPosition,
  HavePositionPermission,
  UserLocation,
} from "../../providers/UserLocation";

const HeaderSection = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useRecoilState(UserLocation);

  async function InitPosition() {
    const r = await HavePositionPermission();

    setPosition((prev) => ({ ...prev, hasPermission: r }));

    if (r && (position.latitude === null || position.longitude === null))
      getPosition();
  }

  function getPosition() {
    setLoading(true);

    GetUserPosition(
      (position) => {
        console.log("Position: ");
        console.log(position);

        setPosition((prev) => ({
          ...prev,
          hasPermission: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setLoading(false);
      },
      (error) => {
        console.log("Error..");
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    InitPosition();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* Title positon */}
      <div>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "4px",
          }}
        >
          Escort in{" "}
          {loading
            ? "Loading..."
            : (position?.latitude ?? "lat") +
              " " +
              (position?.longitude ?? "lng")}
        </h1>
        <div style={{ color: "grey", fontSize: "14px" }}>
          {position
            ? "Vuoi cercare in una zona diversa?"
            : "Vuoi cercare nella tua zona?"}{" "}
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "red",
              padding: "0px",
              textDecoration: "underline",
            }}
            onClick={position.hasPermission ? () => {} : () => getPosition()}
            disabled={loading}
          >
            {loading ? "Loading..." : "clicca qui"}
          </button>
        </div>
      </div>
    </div>
  );
};

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

      <div style={{ padding: "0px 12px" }}>
        {/* Title */}
        <HeaderSection />
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
