import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Services from "./routes/services/Services";
import AboutUs from "./routes/about-us/AboutUs";
import ContactUs from "./routes/contact-us/ContactUs";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fontsource/poppins";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Appointment from "./components/Appointment/Appoinment";
import { getToken } from "./auth/oauth.ts";

function App() {
  getToken();

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
