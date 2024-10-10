import "./Home.scss";
import Header from '../../components/header/Header'
import HomeCareSection from "../../components/HomeCareSection/HomeCareSection";
import AboutSection from "../../components/AboutSection/About";
import GuidingPrinciples from "../../components/GuidingPrinciples/GuidingPrinciples";
import ServicesSection from "../../components/ServiceSection/ServiceSecxtion";
import Testimonials from "../../components/Testimonials/Testimonials";
import JourneySection from "../../components/JourneySection/JourneySection";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return <>
<Header/>
<HomeCareSection/>
<AboutSection/>
<GuidingPrinciples/>
<ServicesSection/>
<Testimonials/>
<JourneySection/>
<Footer/>
  </>;
};
export default Home;
