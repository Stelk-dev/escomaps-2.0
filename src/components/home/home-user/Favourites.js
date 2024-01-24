import React from "react";
import { useRecoilState } from "recoil";
import { CurrentUser } from "../../../providers/ClientUserData";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AdvItem from "../widgets/AdvItem";

export default function Favourites() {
  const [user] = useRecoilState(CurrentUser);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user.favouritesAds.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "50px",
            height: "90vh",
            color: "grey",
            fontStyle: "italic",
            padding: "24px",
          }}
        >
          <p>
            Non hai annunci preferiti, per salvarli{" "}
            <strong style={{ color: "white" }}>
              apri un annuncio e clicca il
              <FaRegHeart fontSize={20} style={{ marginLeft: "8px" }} />
            </strong>
          </p>
        </div>
      ) : (
        <div
          style={{
            margin: "100px 0px",
            maxWidth: "1300px",
          }}
        >
          <div
            style={{
              margin: "16px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHeart fontSize={20} style={{ marginRight: "8px" }} />
            <h4>I tuoi annunci preferiti:</h4>
          </div>

          {/* Grid view list */}
          <div className="grid-container" style={{ width: "100%" }}>
            {user.favouritesAds.map((e, i) => (
              <AdvItem advId={e} key={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
