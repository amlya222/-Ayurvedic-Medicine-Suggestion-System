import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import HowToUse from './components/HowToUse';
import Contact from './components/Contact';
import MedicineSearch from './components/MedicineSearch';
import { Login, Signup } from './components/auth';
import Profile from './components/Profile';
import StayHealthy from './components/StayHealthy';
import './App.css';

function App() {
  // Get userId from localStorage token
  const [userId, setUserId] = React.useState<string | null>(null);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setUserId(null); return; }
    import('./services/authService').then(({ authService }) => {
      authService.me(token).then((me: any) => {
        setUserId(me.id);
      }).catch(() => setUserId(null));
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicine-search" element={<MedicineSearch />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stay-healthy" element={<StayHealthy userId={userId || undefined} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
