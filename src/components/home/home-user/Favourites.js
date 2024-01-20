import React from "react";
import { useRecoilState } from "recoil";
import { CurrentUser } from "../../../providers/ClientUserData";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AdvItem from "../widgets/AdvItem";

export default function Favourites() {
  const [user] = useRecoilState(CurrentUser);

  return (
    <div>
      {user.favouritesAds.length === 0 ? (
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "grey",
            fontStyle: "italic",
            textAlign: "center",
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
          <div className="grid-container">
            {user.favouritesAds.map((e, i) => (
              <AdvItem advId={e} key={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
