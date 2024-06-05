// import mongoose from "mongoose";

// const DataSchema = new mongoose.Schema({}, { strict: false });

// const Uploads = mongoose.model('customers', DataSchema);

// export default Uploads;
import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true, // Ensures that Email is required
  },
  Name: {
    type: String,
    required: true, // Ensures that Name is required
  },
  Status: {
    type: String,
    required: true, // Ensures that Status is required
  },
  // You can add more fields if needed
}, { strict: true }); // Enforces the schema structure strictly

const Uploads = mongoose.model('customers', DataSchema);

export default Uploads;
