// import SignupAdvertiser from './components/auth/SignupAdvertiser';
import { useState } from "react";
import Home from "./components/home/Home";
import AppBar from "./components/widgets/AppBar";
import "./css/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import AdvDetailView from "./components/adv/AdvDetailView";
import Sidebar from "./components/widgets/Sidebar";
import SignupAdvertiser from "./components/auth/SignupAdvertiser";
import LoginAdvertiser from "./components/auth/LoginAdvertiser";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const loc = useLocation();
  const isAtHome = loc.pathname === "/";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div style={{ padding: "0px", display: "flex", flexDirection: "column" }}>
      <Sidebar open={showSidebar} onSidebarClose={toggleSidebar} />

      <AppBar
        showMenuIcon={isAtHome}
        showSearchIcon={isAtHome}
        showSidebar={toggleSidebar}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adv-detail/:id" element={<AdvDetailView />} />
        <Route path="/signup-advertiser" element={<SignupAdvertiser />} />
        <Route path="/login-advertiser" element={<LoginAdvertiser />} />
      </Routes>
      {/* <SignupAdvertiser /> */}
    </div>
  );
}

export default App;
