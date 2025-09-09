// models/ShippingPolicy.js
import mongoose from 'mongoose';

const ShippingPolicySchema = new mongoose.Schema({
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
});

// Prevent model overwrite upon hot-reload in Next.js dev
const ShippingPolicy = mongoose.models.ShippingPolicy || mongoose.model('ShippingPolicy', ShippingPolicySchema);

export default ShippingPolicy;
