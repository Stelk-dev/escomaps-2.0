import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { UserLocation } from "../../../providers/UserLocation";
import { useRecoilState } from "recoil";

export default function AdsList({ ads }) {
  //   {
  //     "reviews": [],
  //     "uidAdvertiser": "2H2bZ4tFcCRWqUbULJpv1lfXDr12",
  //     "photos": [
  //         "499787563-adv_969639743_2_image.jpg",
  //         "499788080-adv_969639743_0_image.jpg",
  //         "499788598-adv_969639743_1_image.jpg"
  //     ],
  //     "twitterLink": "",
  //     "phoneNumber": "+393802640304",
  //     "facebookLink": "",
  //     "lastDateOfBoostActivated": {
  //         "seconds": 1697010408,
  //         "nanoseconds": 842000000
  //     },
  //     "description": "xxx",
  //     "idADV": "969639743",
  //     "title": "TItolo",
  //     "birthDate": "01/12/2002",
  //     "tikTokLink": "",
  //     "isDisabled": false,
  //     "instagramLink": "",
  //     "status": null,
  //     "dateExpire": {
  //         "seconds": 1698706800,
  //         "nanoseconds": 981000000
  //     },
  //     "gender": 0,
  //     "services": [],
  //     "telegram": "+39",
  //     "name": "Stefan",
  //     "onlyfansLink": "",
  //     "showReviews": true,
  //     "locationData": {
  //         "canReceiveAtHome": true,
  //         "lat": 44.57891589999999,
  //         "canGoToHomes": true,
  //         "lon": 10.280328,
  //         "address": "Via S. Michele Cavana, 46, 43037 Neviano degli Arduini PR, Italy",
  //         "locationPublic": true
  //     },
  //     "datePublished": {
  //         "seconds": 1696407979,
  //         "nanoseconds": 837000000
  //     },
  //     "whatsapp": "+39",
  //     "categories": [
  //         {
  //             "subCategories": [],
  //             "index": 0,
  //             "name": "Donna"
  //         },
  //         {
  //             "name": "Uomo",
  //             "index": 1,
  //             "subCategories": []
  //         }
  //     ]
  // }

  const getAge = (birthDate) => {
    const date1 = new Date(birthDate);
    const date2 = new Date();

    const diffYears = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  };

  const getImagePath = ({ image, idAdvertiser }) => {
    if (image.includes("http")) return image;
    return "404";
  };

  const DistanceCalculator = ({ advLatitude, advLongitude }) => {
    const [position] = useRecoilState(UserLocation);

    const calculateDistance = () => {
      const lat1 = position.latitude;
      const lon1 = position.longitude;
      const lat2 = advLatitude;
      const lon2 = advLongitude;
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Distance in km
      return distance;
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const distance = calculateDistance(advLatitude, advLongitude).toFixed(2);

    return (
      <p style={{ fontSize: "11px", color: "grey" }}>{distance} km da te</p>
    );
  };

  return (
    <div>
      {/* Loading */}
      {ads.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "white" }} />
        </div>
      )}

      {/* Grid view list */}
      <div className="grid-container">
        {ads.map((a) => (
          <Link
            key={a.idADV}
            to={{pathname: "/adv-detail/" + a.idADV, param1: "ciao"}}
            style={{ color: "white", textDecoration: "none" }}
          >
            <div key={a} className="grid-item">
              {/* Image */}
              <img
                src={getImagePath({
                  image: a.photos[0],
                  idAdvertiser: a.uidAdvertiser,
                })}
                className="grid-item-image"
                alt="escort-label"
              />

              {/* Description */}
              <div className="grid-item-description">
                {/* Data */}
                <h5 style={{ fontSize: "14px", marginBottom: "2px" }}>
                  {a.name}, {getAge(a.birthDate)}
                </h5>

                {/* Distance */}
                <DistanceCalculator
                  advLatitude={a.locationData.lat}
                  advLongitude={a.locationData.lon}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
