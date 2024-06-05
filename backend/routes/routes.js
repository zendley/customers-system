import express from "express"
import multer from "multer"
import { GetCustomers} from "../controller/CustomersController.js"
import { CreateRegistration } from "../controller/RegisterationController.js"
import { AdminLogin } from "../controller/LoginController.js"
import xlsx from 'xlsx'; // Import xlsx

import Uploads from "../models/Uploads.js"

const routers = express.Router()
// Registraion API
routers.post("/register/admin", CreateRegistration)
routers.post("/login/asadmin", AdminLogin)
routers.get("/get/customers", GetCustomers)

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
routers.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (data.length < 2) {
        return res.status(400).send('File is empty or does not have enough data.');
    }

    const headers = data[0];
    const rows = data.slice(1);

    const emailHeader = headers.find(header => header.toLowerCase().includes('email'));
    const nameHeader = headers.find(header => header.toLowerCase().includes('name'));
    const statusHeader = headers.find(header => header.toLowerCase().includes('status'));

    if (!emailHeader || !nameHeader || !statusHeader) {
        return res.status(400).send('File must contain Email, Name, and Status columns.');
    }

    const formattedData = rows.map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
            if (header === emailHeader) {
                rowData.Email = row[index];
            } else if (header === nameHeader) {
                rowData.Name = row[index];
            } else if (header === statusHeader) {
                rowData.Status = row[index];
            } else {
                rowData[header] = row[index];
            }
        });
        return rowData;
    });

    const validData = formattedData.filter(item => item.Email && item.Name && item.Status);

    if (validData.length === 0) {
        return res.status(400).send('No valid data to insert.');
    }

    Uploads.insertMany(validData)
        .then(() => res.send('File uploaded and data inserted into database'))
        .catch(error => res.status(500).send(error.message));
});

export default routers;