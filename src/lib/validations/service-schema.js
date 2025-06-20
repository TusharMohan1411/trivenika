import { z } from "zod";

// Step 3 schema for each “big description” section
const ProductBigDescriptionSection = z.object({
  name: z.string().min(1, "Section Name is required"),
  title: z.string().min(1, "Section Title is required"),
  content: z.string().min(1, "Section Content is required"),
});

// Variants schema
const VariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  image: z.string().optional(),
  actualPrice: z.number().min(0, "Actual price is required"),
  discountedPrice: z.number().min(0).optional(),
});

// WhyToBuy schema
const WhyToBuySchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const ServiceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  images: z
    .array(z.string().url("Must be a valid image URL"))
    .min(1, "At least one image is required"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tags: z.array(z.string()).optional(),
  status: z.boolean(),

  multipleUseHeading: z.string().optional(),
  multipleUsePoints: z
    .array(z.string().min(1, "Detail cannot be empty"))
    .optional(),

  shortPoints: z.array(z.string()).optional(),

  variants: z.array(VariantSchema).optional(),

  whyToBuy: z.array(WhyToBuySchema).optional(),

  labTestingReport: z.string().optional(),

  recommendedServices: z.array(z.string()).optional(),

  productBigDescription: z.array(ProductBigDescriptionSection).optional(),
});
