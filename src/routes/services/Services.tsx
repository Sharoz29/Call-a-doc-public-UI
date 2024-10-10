import Footer from "../../components/Footer/Footer";
import GuidingPrinciples from "../../components/GuidingPrinciples/GuidingPrinciples";
import Header from "../../components/header/Header";
import HomeCareSection from "../../components/HomeCareSection/HomeCareSection";
import JourneySection from "../../components/JourneySection/JourneySection";
import ServicesSection from "../../components/ServiceSection/ServiceSecxtion";
import "./Services.scss";

const Services = () => {
  return <>
  <Header/>
   <HomeCareSection/>
   <ServicesSection/>
   <GuidingPrinciples/>
   < JourneySection/>
<   Footer/>
  </>
};

export default Services;
