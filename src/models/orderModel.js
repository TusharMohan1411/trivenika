import mongoose from 'mongoose';
import CallPlan from './callPlanModel';

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

const refundSchema = new mongoose.Schema({
    refundId: { type: String },
    amount: { type: Number },
    date: { type: Date }
});

const orderSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['call', 'service'], required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        subService: { type: mongoose.Schema.Types.ObjectId, ref: 'SubService' },
        callPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'CallPlan' },
        details: { type: Object, required: true },
        documents: [{ fieldName: String, url: String }],
        amount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' },
        status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
        refund: refundSchema,
        messages: [messageSchema],
        transactionId: { type: String },
        razorpayOrder: { type: String }
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
