import { NextResponse } from 'next/server';
import SubService from '@/models/subServiceModel';
import { connectDB } from '@/lib/mongodb';
import Service from '@/models/serviceModel';

// GET all sub-services
export async function GET() {
    try {
        await connectDB();
        const subServices = await SubService.find();

        if (subServices.length <= 0) {
            return NextResponse.json({ success: true, data: [], message: 'No sub-services found' });
        }

        return NextResponse.json({ success: true, data: subServices });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching sub-services', error },
            { status: 500 }
        );
    }
}

// CREATE a new sub-service
export async function POST(req) {
    await connectDB();

    try {
        const data = await req.json();

        // Validate that the service exists first
        const existingService = await Service.findById(data.serviceId);
        if (!existingService) {
            return NextResponse.json(
                { message: 'Service not found', error: 'Invalid serviceId' },
                { status: 404 }
            );
        }

        // Create the sub-service
        const newSubService = await SubService.create(data);

        // Update the service to include the new sub-service
        const updatedService = await Service.findByIdAndUpdate(
            data.serviceId,
            { $push: { subServices: newSubService._id } },
            { new: true, runValidators: true }
        ).populate('subServices'); // Populate to verify the update

        // Verify the update was successful
        if (!updatedService) {
            // If update failed, clean up the created sub-service
            await SubService.findByIdAndDelete(newSubService._id);
            return NextResponse.json(
                { message: 'Failed to update service with sub-service' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: newSubService,
            updated: updatedService
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating sub-service:', error);
        return NextResponse.json(
            { message: 'Error creating sub-service', error: error.message },
            { status: 500 }
        );
    }
}