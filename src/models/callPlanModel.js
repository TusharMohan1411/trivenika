// Name, Price, time, instructions arraya
import mongoose from 'mongoose';

const callPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    instructions: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true,
});

const CallPlan = mongoose.models.CallPlan || mongoose.model('CallPlan', callPlanSchema);
export default CallPlan;
