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
import SelectCityLocationModal from "./widgets/SelectCityLocationModal";
import "./css/HomeAds.css";
import DisclaimerBox from "../widgets/boxes/Disclaimer";
import { GetAds } from "../../providers/AdsProvider";
import Footer from "../widgets/Footer";

const HeaderSection = () => {
  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [position, setPosition] = useRecoilState(UserLocation);

  async function InitPosition() {
    const r = await HavePositionPermission();

    setPosition((prev) => ({ ...prev, hasPermission: r }));

    if (r && (position.latitude === null || position.longitude === null))
      getPosition();
    else
      setPosition((prev) => ({
        ...prev,
        hasPermission: false,
        latitude: 0,
        longitude: 0,
      }));
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
        // TODOs: Handle user denied location
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    InitPosition();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        {/* Title positon */}
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

        {/* Subtitle */}
        {/* When user doesn't location permission ask it, if it has show change location modal */}
        <div style={{ color: "grey", fontSize: "14px" }}>
          {position.hasPermission
            ? "Vuoi cercare in una zona diversa? "
            : "Vuoi cercare nella tua zona? "}
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "red",
              padding: "0px",
              textDecoration: "underline",
            }}
            onClick={
              position.hasPermission
                ? () => setShowLocationModal(true)
                : () => getPosition()
            }
            disabled={loading}
          >
            {loading ? "Loading..." : "clicca qui"}
          </button>
        </div>
      </div>

      {/* Select location dialog */}
      <SelectCityLocationModal
        open={showLocationModal}
        onSelect={(newPos) => {
          console.log(newPos);
        }}
        onClose={() => setShowLocationModal(false)}
      />
    </div>
  );
};

export default function HomeAds() {
  const [interestedFilters, setInterestedFilters] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  function HandleFilterTap(name) {
    const elementExist = interestedFilters.some((item) => item === name);

    if (elementExist) {
      setInterestedFilters((prev) => [...prev].filter((e) => e !== name));
    } else setInterestedFilters([...interestedFilters, name]);
  }

  // Init ads
  useEffect(() => {
    GetAds.then((e) => {
      const data = e.docs.map((a) => a.data());
      setAds(data);
      setLoading(false);
    });
    return;
  }, []);

  return (
    <div
      style={{
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1324px",
          marginBottom: "40px",
          marginLeft: "12px",
          marginRight: "12px",
        }}
      >
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
          <div className="container-list">
            {FiltersInHome.map((e) => (
              <SelectableBox
                name={e}
                key={e}
                onSelect={() => HandleFilterTap(e)}
                isSelected={interestedFilters.includes(e)}
              />
            ))}
          </div>
        </div>
        <br />

        {/* Ads list */}
        <AdsList ads={ads} loading={loading} />

        {/* Divider */}
        <div
          style={{
            height: "1px",
            margin: "40px 32px",
            backgroundColor: "#333333",
          }}
        />

        {/* Copy */}
        <div style={{ padding: "16px" }}>
          <h1 style={{ fontSize: "22px" }}>
            Escort a Milano, annunci personali di uomo cerca donna
          </h1>
          <div style={{ height: "16px" }} />
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              color: "grey",
            }}
          >
            <strong style={{ color: "white" }}>Escomaps Milano</strong> ti offre
            i migliori annunci per uomini che cercano donne. Belle donne
            disponibili per incontri e per accompagnarti a riunioni o eventi.
            Trova la donna perfetta in cerca di compagnia per vivere momenti
            speciali nella tua città. In questa pagina puoi trovare un elenco di
            escort a Milano. Non aspettare, oggi è il momento di godersi un
            momento speciale. Vuoi compagnia? Basta selezionare uno degli
            annunci pubblicati in Uomo cerca Donna Milano.
          </h2>
          <div style={{ height: "32px" }} />

          <h1 style={{ fontSize: "22px" }}>Cerchi una escort a Milano?</h1>
          <div style={{ height: "16px" }} />
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              color: "grey",
            }}
          >
            Escomaps ti proprone{" "}
            <strong>
              la più ampia raccolta di annunci di incontri di sesso a Milano
            </strong>
            . Pronto a vivere un'esperienza unica e indimenticabile? Il nostro
            sito è il numero uno per la ricerca di annunci uomo cerca donna. Se
            non riesci a trovare ciò che ti piace, prova a inserire il tuo
            annuncio. Troverai ragazze provenienti da diverse aree e quartieri
            di Milano. Scorri tra gli annunci e trova la escort a Milano più
            vicina alla tua posizione. Guarda i dettagli dell'annuncio e le
            immagini di donne in cerca di uomini. Troverai le migliori ragazze
            escort per incontri di puro piacere nella tua città.
          </h2>
          <div style={{ height: "32px" }} />

          <h1 style={{ fontSize: "22px" }}>Cosa cerchi una escort?</h1>
          <div style={{ height: "16px" }} />
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              color: "grey",
            }}
          >
            Su Escomaps puoi trovare accompagnatrici di lusso, servizi di
            accompagnatrici per riunioni o cene, eventi o feste. Puoi
            selezionare donne a Agrigento in base all'aspetto fisico, colore dei
            capelli (bionde, brune, rosse...).la nazionalità, A Agrigento,
            infatti, puoi trovare donne di diversa nazionalità. Puoi trovare
            latine, brasiliane, venezuelane,... fino alle ragazze orientali,
            cinesi e thailandesi per massaggi erotici... Agrigento è una città
            fantastica per trovare dolci incontri per adulti! Ancora indeciso?
            Non esitare, entra e scorri tra le immagini dei centinaia di nuovi
            annunci giornalieri che le migliori escort di Agrigento pubblicano
            sul nostro sito. Solo pochi clic ti separano dal tuo incontro hot.
            Puoi contattare le inserzioniste chiamando o attraverso WhatsApp.
            Trova a mega escort a Agrigento nelle migliori zone e quartieri
            della città: Agrigento città, Alessandria della Rocca, Ribera,
            Sciacca... Se vuoi cercare tra gli annunci di escort girls Agrigento
            in altre aree devi solo usare il nostro motore di ricerca. Donne
            mature Agrigento che cercano compagnia per vivere momenti speciali
            in compagnia di un uomo. Annunci di incontri ed escort a Agrigento
            per conoscere nuove persone nella tua zona. Su Bakeka Incontri tante
            donne a Agrigento ti stanno cercando, per trascorrere insieme con te
            ore piccanti e rilassanti, senza complicazioni. Puoi fare nuovi
            incontri a Agrigento, tante nuove emozioni ti attendono, scegli il
            partner giusto e goditi ogni momento.
          </h2>
        </div>

        <div
          style={{
            height: "1px",
            margin: "40px 32px",
            backgroundColor: "#333333",
          }}
        />

        {/* Disclaimer */}
        <DisclaimerBox />
      </div>

      <Footer />
    </div>
  );
}
