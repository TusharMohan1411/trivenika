// app/orderSuccess/page.jsx
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { getHomePageData } from "@/lib/main/getHomePageData";
import { getOrderById } from "@/lib/main/getOrders";

export default async function page({ params }) {
    const { services, categories } = await getHomePageData();
    const order = await getOrderById(params.id)
    console.log(order)

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="max-w-4xl mx-auto px-4 py-8"></div>
        </WebsiteLayout>
    )
}