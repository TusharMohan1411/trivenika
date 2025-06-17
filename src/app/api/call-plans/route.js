import { connectDB } from "@/lib/mongodb";
import CallPlan from "@/models/callPlanModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        const callPlans = await CallPlan.find().sort({ updatedAt: -1 })
        return NextResponse.json({ data: callPlans })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        await connectDB()

        if (body.name) {
            const existing = await CallPlan.findOne({ name: body.name })

            if (existing) {
                throw new Error("Call Plan already exists. Please use a unique value.");
            }
        }

        const newCallPlan = await CallPlan.create(body)
        return NextResponse.json({ succes: true, callPlan: newCallPlan }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: e.message }, { status: 400 })
    }
}