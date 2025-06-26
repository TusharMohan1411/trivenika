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
import OilUsageSection2 from "@/components/website/home/OilUsageSection2";
import ServicesByCategory from "@/components/website/home/ServicesByCategory";
import Testimonials from "@/components/website/home/Testimonials";
import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import TestimonialSlider2 from "@/components/website/home/TestimonialSlider2";
import WhyChooseSection from "@/components/website/home/WhyChooseSection";
import WhyChooseSection2 from "@/components/website/home/WhyChooseSection2";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import LatestBlogs from "@/components/website/LatestBlogs";
import LatestServices from "@/components/website/LatestServices";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getHomePageData } from "@/lib/main/getHomePageData";

export default async function Home() {

  return (
    <WebsiteLayout>
      <HeroSection />
      <LatestServices />
      <LabTestingSection />
      {/* <WhyChooseSection /> */}
      <WhyChooseSection2 />
      <OilUsageSection2 />
      {/* <OilUsageSection /> */}
      <TestimonialSlider />
      <LatestBlogs />
      {/* <TestimonialSlider2 /> */}
      {/* <ConnectWithLawyer />
      <WhyChooseUs />
      <LegalSolutions />
      <Testimonials />
      */}
      <Contact />
    </WebsiteLayout>
  );
}