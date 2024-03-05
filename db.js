import mongoose from 'mongoose';

const DB_HOST = process.env.DB_HOST;
// mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error("Database connection error", error);
    process.exit(1);
  });