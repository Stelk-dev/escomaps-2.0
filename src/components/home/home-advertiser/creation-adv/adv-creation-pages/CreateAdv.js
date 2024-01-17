import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CreateAdvSelectPackage from "./CreateAdvSelectPackage";
import CreateAdvPersonalData from "./CreateAdvPersonalData";
import CreateAdvLocation from "./CreateAdvLocation";
import CreateAdvServices from "./CreateAdvServices";
import CreateAdvSocials from "./CreateAdvSocials";
import CreateAdvBio from "./CreateAdvBio";
import CreateAdvPhotos from "./CreateAdvPhotos";
import ReviewAdv from "./ReviewAdv";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CreationAdvAtom } from "../../../../../providers/CreationAdv";
import SuccessScreen from "../../../widgets/SuccessScreen";

export default function CreateAdv() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [advData, setAdvData] = useRecoilState(CreationAdvAtom);
  const reset = useResetRecoilState(CreationAdvAtom);

  const pathsAdvCreation = [
    "select-package",
    "add-personal-data",
    "add-location",
    "add-services",
    "add-socials",
    "add-photos",
    "add-description",
    "review-adv",
  ];

  const CurrentIndex = () => {
    const p = loc.pathname.replace("/create-adv/", "");
    return pathsAdvCreation.indexOf(p);
  };

  const ProgressBarBox = ({ i, isLastOne = false }) => {
    return (
      <div
        style={{
          borderRadius: "2px",
          backgroundColor:
            CurrentIndex() > i
              ? "#BA68C8"
              : CurrentIndex() === i
              ? "#4e2f55"
              : "#333333AA",
          flex: "1",
          height: "14px",
          marginRight: isLastOne ? "" : "8px",
        }}
      />
    );
  };

  const Continue = (data) => {
    setAdvData({ ...advData, ...data });
    navigate(pathsAdvCreation[CurrentIndex() + 1]);
  };

  const Back = () => {
    navigate(pathsAdvCreation[CurrentIndex() - 1]);
  };

  useEffect(() => {
    navigate("/create-adv/");
    reset();

    return () => {};
    // eslint-disable-next-line
  }, []);

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
          {Array.from({ length: pathsAdvCreation.length - 1 }).map(
            (_i, index) => (
              <ProgressBarBox i={index} key={index} isLastOne={index === 6} />
            )
          )}
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
                <CreateAdvPersonalData onContinue={Continue} onBack={Back} />
              }
            />
            <Route
              path="add-location"
              element={
                <CreateAdvLocation onContinue={Continue} onBack={Back} />
              }
            />
            <Route
              path="add-services"
              element={
                <CreateAdvServices
                  advData={advData}
                  onContinue={Continue}
                  onBack={Back}
                />
              }
            />
            <Route
              path="add-socials"
              element={
                <CreateAdvSocials
                  advData={advData}
                  onContinue={Continue}
                  onBack={Back}
                />
              }
            />
            <Route
              path="add-photos"
              element={
                <CreateAdvPhotos
                  advData={advData}
                  onContinue={Continue}
                  onBack={Back}
                />
              }
            />
            <Route
              path="add-description"
              element={
                <CreateAdvBio
                  advData={advData}
                  onContinue={Continue}
                  onBack={Back}
                />
              }
            />
            <Route path="review-adv" element={<ReviewAdv onBack={Back} />} />
            <Route
              path="upload-success"
              element={
                <SuccessScreen
                  title={"Annuncio pubblicato!"}
                  isAdvCreation={true}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
