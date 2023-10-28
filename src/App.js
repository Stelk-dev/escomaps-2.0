import { useState } from "react";
import HomeAds from "./components/home/HomeAds";
import AppBar from "./components/widgets/AppBar";
import "./css/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import AdvDetailView from "./components/adv/AdvDetailView";
import Sidebar from "./components/widgets/Sidebar";
import SignupAdvertiser from "./components/auth/SignupAdvertiser";
import LoginAdvertiser from "./components/auth/LoginAdvertiser";
import BottomBar from "./components/widgets/BottomBar";
import Chat from "./components/home/components-user/Chat";
import Favourites from "./components/home/components-user/Favourites";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const loc = useLocation();
  const isAtHome = loc.pathname === "/";
  const [index, setIndex] = useState(0);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const showSearchIcon = () => loc.pathname === "/";

  const showMenuIcon = () =>
    loc.pathname === "/" ||
    loc.pathname === "/chats-user" ||
    loc.pathname === "/favourites-user";

  return (
    <div style={{ padding: "0px", display: "flex", flexDirection: "column" }}>
      {/* Side bar */}
      <Sidebar open={showSidebar} onSidebarClose={toggleSidebar} />

      {/* App bar */}
      <AppBar
        showMenuIcon={showMenuIcon()}
        showSearchIcon={showSearchIcon()}
        showSidebar={toggleSidebar}
      />

      {
        showMenuIcon() && <BottomBar index={index} setIndex={setIndex} />
      }

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomeAds />} />
        <Route path="/chats-user" element={<Chat />} />
        <Route path="/favourites-user" element={<Favourites />} />
        <Route path="/adv-detail/:id" element={<AdvDetailView />} />
        <Route path="/signup-advertiser" element={<SignupAdvertiser />} />
        <Route path="/login-advertiser" element={<LoginAdvertiser />} />
      </Routes>
    </div>
  );
}

export default App;
