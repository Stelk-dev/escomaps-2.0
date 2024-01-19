import { useEffect, useState } from "react";
import HomeAds from "./components/home/HomeAds";
import AppBar from "./components/widgets/AppBar";
import "./css/App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdvDetailView from "./components/adv/AdvDetailView";
import Sidebar from "./components/widgets/Sidebar";
import SignupAdvertiser from "./components/auth/signup/SignupAdvertiser";
import LoginAdvertiser from "./components/auth/LoginAdvertiser";
import BottomBar from "./components/widgets/BottomBar";
import Chat from "./components/home/home-user/Chat";
import Favourites from "./components/home/home-user/Favourites";
import SearchAds from "./components/home/SearchAds";
import Faq from "./components/widgets/sidebar-pages/Faq";
import ContactUs from "./components/widgets/sidebar-pages/ContactUs";
import TermsAndConditions from "./components/widgets/sidebar-pages/TermsAndConditions";
import PrivacyPolicy from "./components/widgets/sidebar-pages/PrivacyPolicy";
import VerifyEmail from "./components/auth/signup/VerifyEmail";
import AdvertiserDataSignup from "./components/auth/signup/AdvertiserDataSignup";
import { Auth } from "./Firebase";
import { useRecoilState } from "recoil";
import {
  CurrentUserAdvertiser,
  GetAdvertiserData,
} from "./providers/AdvertiserUserData";
import VerifyIdentity from "./components/auth/signup/VerifyIdentity";
import AdvertiserAds from "./components/home/home-advertiser/AdvertiserAds";
import AdvertiserChats from "./components/home/home-advertiser/AdvertiserChats";
import AdvertiserSettings from "./components/home/home-advertiser/AdvertiserSettings";
import ForgotCredentials from "./components/auth/ForgotCredentials";
import DeleteAccount from "./components/home/home-advertiser/settings/DeleteAccount";
import BuyCredits from "./components/home/home-advertiser/creation-adv/BuyCredits";
import SuccessScreen from "./components/home/widgets/SuccessScreen";
import CreateAdv from "./components/home/home-advertiser/creation-adv/adv-creation-pages/CreateAdv";
import { CurrentUser, GetUserData } from "./providers/ClientUserData";

function App() {
  const [currentClientUser, setcurrentClientUser] = useRecoilState(CurrentUser);
  const [currentUserAdvertiser, setcurrentUserAdvertiser] = useRecoilState(
    CurrentUserAdvertiser
  );

  const [showSidebar, setShowSidebar] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const hideAnimationAppBar = () =>
    loc.pathname.includes("/adv-detail") ||
    loc.pathname === "/advertiser/ads" ||
    loc.pathname.includes("/create-adv");

  const showBottomBar = () =>
    loc.pathname === "/" ||
    loc.pathname === "/chats-user" ||
    loc.pathname === "/favourites-user";

  const showAdvertiserBottomBar = () => loc.pathname.includes("/advertiser");

  const showSearchIcon = () =>
    loc.pathname === "/" ||
    loc.pathname === "/advertiser" ||
    loc.pathname.includes("/adv-detail") ||
    loc.pathname === "/search";

  const showMenuIcon = () =>
    loc.pathname === "/" ||
    loc.pathname.includes("/advertiser") ||
    loc.pathname.includes("/create-adv") ||
    loc.pathname === "/search" ||
    loc.pathname === "/buy-credits" ||
    loc.pathname.includes("/adv-detail") ||
    loc.pathname === "/chats-user" ||
    loc.pathname === "/favourites-user" ||
    loc.pathname === "/faq" ||
    loc.pathname === "/contact-us" ||
    loc.pathname === "/terms-and-conditions" ||
    loc.pathname === "/privacy-policy";

  // Init user from DB
  useEffect(() => {
    Auth.onAuthStateChanged(async (user) => {
      console.log("[onAuthStateChanged] Uid: " + user?.uid);

      if (user?.uid != null) {
        // Get advertiser / set advertiser (if empty value)
        if (currentUserAdvertiser.name.length === 0) {
          const _advertiser = await GetAdvertiserData(user?.uid);
          if (_advertiser != null) {
            setcurrentUserAdvertiser(_advertiser);
            if (_advertiser.identityVerified && loc.pathname === "/")
              navigate("/advertiser/ads");
          }
        }

        // Get user / set user (if empty value)
        if (currentClientUser.name.length === 0) {
          const _user = await GetUserData(user?.uid);
          if (_user != null) {
            setcurrentClientUser(_user);
          }
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "0px", display: "flex", flexDirection: "column" }}>
      {/* Side bar */}
      <Sidebar
        open={showSidebar}
        onSidebarOpen={toggleSidebar}
        onSidebarClose={toggleSidebar}
      />

      {/* App bar */}
      <AppBar
        hideAnimation={hideAnimationAppBar()}
        showMenuIcon={showMenuIcon()}
        showSearchIcon={showSearchIcon()}
        showSidebar={toggleSidebar}
      />

      {/* Bottom bar */}
      {showBottomBar() && (
        <BottomBar index={index} setIndex={setIndex} isAdvertiser={false} />
      )}

      {/* Bottom bar advertiser */}
      {showAdvertiserBottomBar() && <BottomBar isAdvertiser={true} />}

      {/* Routes */}
      <Routes>
        {/* Main home */}
        <Route path="/" element={<HomeAds />} />
        <Route path="/search" element={<SearchAds />} />
        <Route path="/adv-detail/:id" element={<AdvDetailView />} />

        {/* User page */}
        <Route path="/chats-user" element={<Chat />} />
        <Route path="/favourites-user" element={<Favourites />} />

        {/* Advertiser page */}
        <Route path="/advertiser" element={<HomeAds />} />
        <Route path="/buy-credits" element={<BuyCredits />} />
        <Route path="/advertiser/chats" element={<AdvertiserChats />} />
        <Route path="/advertiser/ads" element={<AdvertiserAds />} />
        <Route path="/advertiser/settings" element={<AdvertiserSettings />} />
        <Route
          path="/advertiser/settings/delete-account"
          element={<DeleteAccount />}
        />

        {/* Create Adv*/}
        <Route path="/create-adv/*" element={<CreateAdv />} />

        {/* Auth Signup*/}
        <Route path="/signup-advertiser" element={<SignupAdvertiser />} />
        <Route
          path="/signup-advertiser-verify-email"
          element={<VerifyEmail />}
        />
        <Route
          path="/signup-advertiser-add-data"
          element={<AdvertiserDataSignup />}
        />
        <Route
          path="/signup-advertiser-verify-identity"
          element={<VerifyIdentity />}
        />

        {/* Auth Login */}
        <Route path="/login-advertiser" element={<LoginAdvertiser />} />

        {/* Forgot credentials */}
        <Route path="/forgot-credentials" element={<ForgotCredentials />} />

        {/* Sidebar option */}
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* One time screen */}
        <Route
          path="/buy-credits/buy-success"
          element={
            <SuccessScreen
              title={"Grazie per il tuo ordine!"}
              isBuyFlow={true}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
