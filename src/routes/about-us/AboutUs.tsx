import AboutSection from "../../components/AboutSection/About";
import Footer from "../../components/Footer/Footer";
import GoalsMissionVision from "../../components/GoalsMissionVision/GoalsMissionVision";
import GuidingPrinciples from "../../components/GuidingPrinciples/GuidingPrinciples";
import Header from "../../components/header/Header";
import HomeCareSection from "../../components/HomeCareSection/HomeCareSection";
import JourneySection from "../../components/JourneySection/JourneySection";
import "./AboutUs.scss";

const AboutUs = () => {
  return <>
   <Header/>
   <HomeCareSection/>
   <GoalsMissionVision/>
   <AboutSection/>
   <GuidingPrinciples/>
   < JourneySection/>
<Footer/>
  
  </>
};
export default AboutUs;
