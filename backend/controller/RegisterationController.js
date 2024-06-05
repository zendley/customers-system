import registrationModels from "../models/Registration.js";
import bcrypt from 'bcrypt';

// Create Registrations API
const CreateRegistration = async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;

        // Check if password and cpassword match
        if (password !== cpassword) {
            return res.status(400).json({ success: false, Message: "Password and Confirm Password do not match" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10

        // Check if email is already registered
        const existingRegistration = await registrationModels.findOne({ email });
        if (existingRegistration) {
            return res.status(400).json({ success: false, Message: "Email is already registered" });
        }

        // Create new registration with hashed password
        const NewRegistration = new registrationModels({
            email, password: hashedPassword // Store hashed password in database
        });
        await NewRegistration.save();

        return res.status(200).json({ success: true, Message: "Registration Created Successfully", NewRegistration });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, Message: "Internal Server Error" });
    }
};

export { CreateRegistration };
