import mongoose from "mongoose";

const dBConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.set("strictQuery", true);

    console.log(`MongoDb connected: ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default dBConnection;
