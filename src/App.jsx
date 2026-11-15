import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import BookingSummaryPage from "./pages/BookingSummaryPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import DataProvider from "./context/DataProvider";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const rawData = localStorage.getItem("dark_mode");
      return rawData ? JSON.parse(rawData) : true;
    } catch {
      return true;
    }
  });

  useEffect(()=>{
    localStorage.setItem("dark_mode",JSON.stringify(darkMode));
  },[darkMode]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<SeatSelectionPage darkMode={darkMode} />} />
          <Route path="/summary" element={<BookingSummaryPage darkMode={darkMode} />} />
          <Route path="/confirmation" element={<BookingConfirmationPage darkMode={darkMode} />} />
          <Route path="*" element={<NotFoundPage darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
