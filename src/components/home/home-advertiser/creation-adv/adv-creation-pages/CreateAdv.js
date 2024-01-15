import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CreateAdvSelectPackage from "./CreateAdvSelectPackage";
import CreateAdvPersonalData from "./CreateAdvPersonalData";
import CreateAdvLocation from "./CreateAdvLocation";
import CreateAdvServices from "./CreateAdvServices";
import CreateAdvSocials from "./CreateAdvSocials";
import CreateAdvBio from "./CreateAdvBio";
import CreateAdvPhotos from "./CreateAdvPhotos";

export default function CreateAdv() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const ProgressBarBox = ({ i, isLastOne = false }) => {
    return (
      <div
        style={{
          borderRadius: "2px",
          backgroundColor:
            index > i ? "#BA68C8" : index === i ? "#4e2f55" : "#333333AA",
          flex: "1",
          height: "14px",
          marginRight: isLastOne ? "" : "8px",
        }}
      />
    );
  };

  const Continue = (data) => {
    switch (index) {
      case 0:
        navigate("add-personal-data");
        break;
      case 1:
        navigate("add-location");
        break;
      case 2:
        navigate("add-services");
        break;
      case 3:
        navigate("add-socials");
        break;
      case 4:
        navigate("add-photos");
        break;
      case 5:
        navigate("add-description");
        break;
      default:
        break;
    }

    setIndex((v) => v + 1);
  };

  const Back = (path) => {
    navigate(path);
    setIndex((v) => v - 1);
  };

  return (
    <div className="main-div">
      <div
        style={{
          marginTop: "100px",
          width: "100vw",
          maxWidth: "700px",
        }}
      >
        {/* Progress bar */}
        <div
          style={{ display: "flex", padding: "0px 20px", marginBottom: "32px" }}
        >
          <ProgressBarBox i={0} />
          <ProgressBarBox i={1} />
          <ProgressBarBox i={2} />
          <ProgressBarBox i={3} />
          <ProgressBarBox i={4} />
          <ProgressBarBox i={5} />
          <ProgressBarBox i={6} isLastOne={true} />
        </div>

        {/* Routes */}
        <div style={{ padding: "0px 20px" }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="select-package" />}
            />
            <Route
              path="select-package"
              element={<CreateAdvSelectPackage onContinue={Continue} />}
            />
            <Route
              path="add-personal-data"
              element={
                <CreateAdvPersonalData
                  onContinue={Continue}
                  onBack={() => Back("select-package")}
                />
              }
            />
            <Route
              path="add-location"
              element={
                <CreateAdvLocation
                  onContinue={Continue}
                  onBack={() => Back("add-personal-data")}
                />
              }
            />
            <Route
              path="add-services"
              element={
                <CreateAdvServices
                  onContinue={Continue}
                  onBack={() => Back("add-location")}
                />
              }
            />
            <Route
              path="add-socials"
              element={
                <CreateAdvSocials
                  onContinue={Continue}
                  onBack={() => Back("add-services")}
                />
              }
            />
            <Route
              path="add-photos"
              element={
                <CreateAdvPhotos
                  onContinue={Continue}
                  onBack={() => Back("add-socials")}
                />
              }
            />
            <Route
              path="add-description"
              element={
                <CreateAdvBio
                  onContinue={Continue}
                  onBack={() => Back("add-photos")}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
