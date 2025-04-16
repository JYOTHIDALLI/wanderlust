const mongoose = require("mongoose"); 
const initData = require("./data.js"); 
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() { 
    try { 
        await mongoose.connect(MONGO_URL); 
        console.log("Connected to DB"); 
        
        await initDB(); // Initialize the database

        await mongoose.connection.close(); // Close the connection properly
        console.log("Database connection closed.");
    } catch (err) { 
        console.error("Database connection error:", err); 
    } 
}

const initDB = async () => { 
    try { 
        await Listing.deleteMany({}); 
        console.log("Previous data cleared.");

        if (!Array.isArray(initData.data) || initData.data.length === 0) {
            throw new Error("initData.data is empty or not an array");
        }

        const inserted = await Listing.insertMany(initData.data);
        console.log("Data inserted successfully:", inserted.length, "records");
    } catch (err) {
        console.error("Error inserting data:", err);
    }
};

main();