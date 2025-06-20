// app/page.jsx
import Footer from "@/components/website/common/Footer";
import NavBar from "@/components/website/common/Navbar";
import { ConnectWithLawyer } from "@/components/website/home/ConnectWithLawyer";
import Contact from "@/components/website/home/Contact";
import HeroSection from "@/components/website/home/HeroSection";
import HeroSection2 from "@/components/website/home/HeroSection2";
import LabTestingSection from "@/components/website/home/LabTestingSection";
import { LegalSolutions } from "@/components/website/home/LegalSolutions";
import OilUsageSection from "@/components/website/home/OilUsageSection";
import ServicesByCategory from "@/components/website/home/ServicesByCategory";
import Testimonials from "@/components/website/home/Testimonials";
import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import WhyChooseSection from "@/components/website/home/WhyChooseSection";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import { getHomePageData } from "@/lib/main/getHomePageData";

export default async function Home() {

  return (
    <div className="">
      <NavBar />
      <HeroSection />
      <LabTestingSection />
      <WhyChooseSection />
      <OilUsageSection />
      <TestimonialSlider />
      {/* <ConnectWithLawyer />
      <WhyChooseUs />
      <LegalSolutions />
      <Testimonials />
      */}
      <Contact />
      <Footer />
    </div>
  );
}