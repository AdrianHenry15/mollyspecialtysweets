import mongoose, { Schema } from "mongoose"

// Product Schema
const ProductSchema = new Schema({
    sku: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    taxable: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("Product", ProductSchema)
