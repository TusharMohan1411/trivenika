import { getTestimonialsData } from "@/lib/main/getStaticData";
import Testimonials from "./Testimonials";

const testimonialsLocal = [
    {
        name: "Riya Verma",
        place: "Kurukshetra, Haryana",
        image: "/testimonial1.png",
        heading: "Excellent Quality",
        message: "I've tried many ghee brands, but this A2 Desi Cow Ghee has a rich aroma and taste that reminds me of homemade ghee. I feel more energetic and my digestion has improved too!",
    },
    {
        name: "Avinash Arora",
        place: "Mumbai, Maharashtra",
        image: "/testimonial1.png",
        heading: "Excellent Quality",
        message: "The wood-pressed coconut oil has transformed my hair care routine. After just 2 months of use, my hair is stronger and shinier than ever before. Truly authentic!",
    },
    {
        name: "Pooja Singh",
        place: "Lucknow, UP",
        image: "/testimonial1.png",
        heading: "Excellent Quality",
        message: "Very authentic product. My family loved the aroma and purity of the ghee. Will definitely buy again!",
    },
    {
        name: "Ramesh Kumar",
        place: "Delhi",
        image: "/testimonial1.png",
        heading: "Excellent Quality",
        message: "Best oil and ghee quality. I use them for daily cooking and even for rituals. Highly recommended!",
    },
    {
        name: "Sunita Reddy",
        place: "Hyderabad, Telangana",
        image: "/testimonial1.png",
        heading: "Excellent Quality",
        message: "The spices are incredibly fresh and aromatic. They've completely elevated my cooking. The packaging is eco-friendly too!",
    },
];

export default async function TestimonialSlider() {

    const res = await getTestimonialsData({
        isVisible: true,
        limit: 15,
        page: 1,
    })

    const testimonials = res.testimonials || testimonialsLocal

    // console.log(testimonials)

    return (
        <div><Testimonials testimonials={testimonials} /></div>
    );
}
