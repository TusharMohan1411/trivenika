import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  actualPrice: { type: Number, required: true },
  discountedPrice: { type: Number, default: 0 },
});

const whyToBuySchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, //
    slug: { type: String, required: true, unique: true, trim: true }, //
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, //
    ],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], //
    shortDescription: { type: String, required: true, trim: true }, //
    multipleUseHeading: { type: String }, //
    multipleUsePoints: [{ type: String }], //

    images: [{ type: String, required: true }], //
    status: { type: Boolean, default: true }, //

    shortPoints: [{ type: String }], //
    whyToBuy: [whyToBuySchema], //

    variants: [variantSchema], //

    labTestingReport: { type: String }, //

    recommendedServices: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    ],

    productBigDescription: [
      {
        name: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;
