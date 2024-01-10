import { useEffect, useState } from "react";
import HomeAds from "./components/home/HomeAds";
import AppBar from "./components/widgets/AppBar";
import "./css/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import AdvDetailView from "./components/adv/AdvDetailView";
import Sidebar from "./components/widgets/Sidebar";
import SignupAdvertiser from "./components/auth/signup/SignupAdvertiser";
import LoginAdvertiser from "./components/auth/LoginAdvertiser";
import BottomBar from "./components/widgets/BottomBar";
import Chat from "./components/home/components-user/Chat";
import Favourites from "./components/home/components-user/Favourites";
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

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const loc = useLocation();
  const [index, setIndex] = useState(0);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const hideAnimationAppBar = () => loc.pathname.includes("/adv-detail");

  const showBottomBar = () =>
    loc.pathname === "/" ||
    loc.pathname === "/chats-user" ||
    loc.pathname === "/favourites-user";

  const showSearchIcon = () =>
    loc.pathname === "/" ||
    loc.pathname.includes("/adv-detail") ||
    loc.pathname === "/search";

  const showMenuIcon = () =>
    loc.pathname === "/" ||
    loc.pathname === "/search" ||
    loc.pathname.includes("/adv-detail") ||
    loc.pathname === "/chats-user" ||
    loc.pathname === "/favourites-user" ||
    loc.pathname === "/faq" ||
    loc.pathname === "/contact-us" ||
    loc.pathname === "/terms-and-conditions" ||
    loc.pathname === "/privacy-policy";

  const [currentUser, setcurrentuser] = useRecoilState(CurrentUserAdvertiser);

  // Init user from DB
  useEffect(() => {
    InitUser();
    // eslint-disable-next-line
  }, []);

  function InitUser() {
    Auth.onAuthStateChanged((user) => {
      console.log("Uid: " + user?.uid);

      if (user?.uid != null)
        GetAdvertiserData(user?.uid).then((v) => {
          console.log(v);
          if (v != null) setcurrentuser(v);

          console.log("Current user: " + currentUser.email);
          console.log("Current user: " + currentUser.identityVerified);
        });
    });
  }

  return (
    <div style={{ padding: "0px", display: "flex", flexDirection: "column" }}>
      {/* Side bar */}
      <Sidebar open={showSidebar} onSidebarClose={toggleSidebar} />

      {/* App bar */}
      <AppBar
        hideAnimation={hideAnimationAppBar()}
        showMenuIcon={showMenuIcon()}
        showSearchIcon={showSearchIcon()}
        showSidebar={toggleSidebar}
      />

      {/* Bottom bar */}
      {showBottomBar() && <BottomBar index={index} setIndex={setIndex} />}

      {/* Routes */}
      <Routes>
        {/* Main home */}
        <Route path="/" element={<HomeAds />} />
        <Route path="/search" element={<SearchAds />} />
        <Route path="/adv-detail/:id" element={<AdvDetailView />} />

        {/* User page */}
        <Route path="/chats-user" element={<Chat />} />
        <Route path="/favourites-user" element={<Favourites />} />

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
          element={<AdvertiserDataSignup />}
        />

        {/* Auth Login */}
        <Route path="/login-advertiser" element={<LoginAdvertiser />} />

        {/* Sidebar option */}
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
