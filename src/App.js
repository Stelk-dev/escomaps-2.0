import { useState } from "react";
import Home from "./components/home/Home";
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

  return (
    <div style={{ padding: "0px", display: "flex", flexDirection: "column" }}>
      {/* Side bar */}
      <Sidebar open={showSidebar} onSidebarClose={toggleSidebar} />

      {/* App bar */}
      <AppBar
        showMenuIcon={isAtHome}
        showSearchIcon={isAtHome}
        showSidebar={toggleSidebar}
      />

      <BottomBar index={index} setIndex={setIndex}/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
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
