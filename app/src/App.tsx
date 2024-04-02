import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// Auth
import { User, onAuthStateChanged } from "firebase/auth";
// Service
import { auth } from "./services/firebase"
// Components
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/Home";
import BillsPayments from "./pages/BillsPayments";
import Visitors from "./pages/Visitors";
import Inventory from "./pages/Inventory";
import Maintenance from "./pages/Maintenance";
import Security from "./pages/Security";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Landing from "./pages/Landing";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <>
        {currentUser ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payments" element={<BillsPayments />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/visitors" element={<Visitors />} />
              <Route path="/security" element={<Security />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/maintenance" element={<Maintenance />} />
            </Routes>
          </>
        ) : (
          <>
            <Landing />
          </>

        )}
      </>
    </Router >
  );
}
