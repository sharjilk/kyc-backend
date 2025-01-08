import mongoose from "mongoose";
import config from "./util/config";
import app from "./index";

const server = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    console.log("Connected to MongoDB database");

    app.listen(config.port || 3000, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server().catch((error) => console.log(error));
