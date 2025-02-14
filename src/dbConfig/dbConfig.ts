import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // ! is used to tell typescript that this is not null
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error.Please makesure MongoDB is running",
        err
      );
      process.exit(1); //exit with failure
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
