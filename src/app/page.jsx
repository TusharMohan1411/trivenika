export const revalidate = 60;
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
      <WhyChooseSection2 />
      <OilUsageSection2 />
      <TestimonialSlider />
      <LatestBlogs />
      <Contact />
    </WebsiteLayout>
  );
}