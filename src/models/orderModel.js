import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    type: { type: String, enum: ["pos", "website"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shippingDetails: {
      fullName: { type: String, required: true },
      contact: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      state: { type: String, required: true },
      pin: { type: String, required: true },
    },
    cart: [
      {
        // serviceId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Service",
        //   required: true,
        // },
        // variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
        serviceName: { type: String, required: true },
        variantName: { type: String, required: true },
        variantImage: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    orderValue: { type: Number, required: true },
    discount: { type: Number },
    subTotal: { type: Number, required: true },
    shippingCharges: { type: Number },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online", "Cash", "UPI"],
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    paymentMessage: {
      type: String,
    },
    status: [
      {
        currentStatus: {
          type: String,
          enum: [
            "New",
            "Processing",
            "Packed",
            "Shipped",
            "Ready for delivery",
            "Delivered",
            "cancelled",
          ],
          default: "New",
        },
        message: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    transactionId: { type: String },
    razorpayOrder: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
