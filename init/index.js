const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wander-lust';

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const dataWithOwner = initData.data.map((obj) => {
        return { ...obj, owner: "652d0081ae547c5d37e565b5f" };
    });
    await Listing.insertMany(dataWithOwner);
    console.log("data was initialized");
};

initDB();