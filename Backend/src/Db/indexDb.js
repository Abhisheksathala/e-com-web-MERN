import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const ConnectDBInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "\n- CONNECTED TO MONGODB FROM INDEXdb OF CONFIG",
      ConnectDBInstance.connection.host
    );
  } catch (error) {
    console.log("YOU GOT ERROR  IN THE INDEXDB.JS:", error);
  }
};
console.log();

export default connectDb;
