require("dotenv").config();

const connectDB = require("./db/connectDB");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Successfully populated db");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

populate();
