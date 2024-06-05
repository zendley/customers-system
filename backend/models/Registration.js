import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const registrationsModels = mongoose.model("CustomerRegistration", registrationSchema);

export default registrationsModels;
