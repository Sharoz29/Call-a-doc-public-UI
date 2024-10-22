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
import { casetypeService } from "./services/casetypes.service.ts";
import { caseService } from "./services/case.service.ts";
import { assignmentService } from "./services/assignment.service.ts";

function App() {
  getToken();

  casetypeService.getCaseTypes().then((caseTypes) => {
    // console.log(caseTypes);
  });

  caseService
    .getCaseView("LCS-CallADoc-Work-AppointmentBooking")
    .then((res) => {
      // console.log(res);
    });
  // caseService
  //   .getCaseActions(`LCS-CALLADOC-WORK P-48040`, `pyChangeStage`)
  //   .then((res) => {
  //     console.log(res);
  //   });

  assignmentService
    .getAssignmentsView(
      `ASSIGN-WORKLIST%20LCS-CALLADOC-WORK%20A-29002!CREATEFORM_DEFAULT`
    )
    .then((res) => {
      // console.log(res);
    });

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
