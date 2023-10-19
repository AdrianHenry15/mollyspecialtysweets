import mongoose, { Schema } from "mongoose"

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

export default mongoose.model("Image", ImageSchema)
