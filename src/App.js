// import SignupAdvertiser from './components/auth/SignupAdvertiser';
import { useState } from 'react';
import Home from './components/home/Home';
import AppBar from './components/widgets/AppBar';
import './css/App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const Sidebar = () => {
    return (
      <div className={showSidebar ? "sidebar" : "show-sidebar"}>
        Sidebar Content
        <button onClick={toggleSidebar}>Close</button>
      </div>
    );
  };



  return (
    <div style={{padding: '0px', display: 'flex', flexDirection: 'column'}}>
      <Sidebar />
      <AppBar showSidebar = {toggleSidebar}/>
      <Home />
      {/* <SignupAdvertiser /> */}
    </div>
  );
}

export default App;
