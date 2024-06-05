import registrationsModels from "../models/Registration.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { randomBytes } from 'crypto';

// Admin Login API creation
const AdminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validate request body
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        // Check if the email is already registered
        const existingAdmin = await registrationsModels.findOne({ email });
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }
        // Compare hashed password
        const passwordMatch = bcrypt.compare(password, existingAdmin.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        // Generate a random secret key
        const secretKey = randomBytes(32).toString('hex');
        const token = jwt.sign({ userId: existingAdmin._id }, secretKey, { expiresIn: '1h' });
        // Respond with success and token
        res.status(200).json({ success: true, message: "Login Successful", token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export { AdminLogin };
