import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Services from "./routes/services/Services";
import AboutUs from "./routes/about-us/AboutUs";
import Blogs from "./routes/blogs/Blogs";
import ContactUs from "./routes/contact-us/ContactUs";
import '@fortawesome/fontawesome-svg-core/styles.css' 
import '@fontsource/poppins';
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <ScrollToTopButton/>
      <Routes>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
