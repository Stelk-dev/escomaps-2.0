// import SignupAdvertiser from './components/auth/SignupAdvertiser';
import { useState } from 'react';
import Home from './components/home/Home';
import AppBar from './components/widgets/AppBar';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import AdvDetailView from './components/adv/AdvDetailView';
import Sidebar from './components/widgets/Sidebar';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div style={{padding: '0px', display: 'flex', flexDirection: 'column'}}>
      <Sidebar open={showSidebar} onSidebarClose={toggleSidebar} />
      
      <AppBar showSidebar={toggleSidebar}/>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adv-detail/:id' element={<AdvDetailView />} />
      </Routes>
      {/* <SignupAdvertiser /> */}
    </div>
  );
}

export default App;
