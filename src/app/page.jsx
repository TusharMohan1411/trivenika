export const revalidate = 60;
// app/page.jsx
// import EnquiryWidget from "@/components/EnquiryWidget";
// import HeroSection2 from "@/components/website/home/HeroSection2";
// import { LegalSolutions } from "@/components/website/home/LegalSolutions";
// import OilUsageSection from "@/components/website/home/OilUsageSection";
// import ServicesByCategory from "@/components/website/home/ServicesByCategory";
// import Testimonials from "@/components/website/home/Testimonials";
// import TestimonialSlider2 from "@/components/website/home/TestimonialSlider2";
// import WhyChooseSection from "@/components/website/home/WhyChooseSection";
// import WhyChooseUs from "@/components/website/home/WhyChooseUs";
// import { getHomePageData } from "@/lib/main/getHomePageData";
import HeroSection from "@/components/website/home/HeroSection";
import HomePageCollections from "@/components/website/home/HomePageCollections";
import LabTestingSection from "@/components/website/home/LabTestingSection";
import OilUsageSection2 from "@/components/website/home/OilUsageSection2";
import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import WhyChooseSection2 from "@/components/website/home/WhyChooseSection2";
import LatestBlogs from "@/components/website/LatestBlogs";
import LatestServices from "@/components/website/LatestServices";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import Contact from "@/components/website/home/Contact";
import { getBanners, getHomePageCollections } from "@/lib/main/getBanners";

export default async function Home() {
  const banners = await getBanners();
  const cols = await getHomePageCollections();
  return (
    <WebsiteLayout>
      <HeroSection banners={banners} />
      <LatestServices />
      <HomePageCollections cols={cols} />
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