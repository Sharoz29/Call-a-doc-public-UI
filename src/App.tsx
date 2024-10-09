import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Services from "./routes/services/Services";
import AboutUs from "./routes/about-us/AboutUs";
import Blogs from "./routes/blogs/Blogs";
import ContactUs from "./routes/contact-us/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index={true} element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
