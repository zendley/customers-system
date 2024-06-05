import Uploads from "../models/Uploads.js";

// Read Customers API
const GetCustomers = async (req, res) => {
    try {
        const Customer = await Uploads.find();
        if (Customer.length === 0) {
            return res.status(404).json({ success: false, Message: "Customer not found" })
        }
        res.status(200).json({ success: true, Customer })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, Message: "Internal Server Error" })
    }
}
export { GetCustomers }
