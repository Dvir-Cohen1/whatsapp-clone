import mongoose from "mongoose";

const initialMongoConnection = () => {
  const mongoConfig = {
    base_uri: String(process.env.MONGO_ATLAS_URI),
    username: String(process.env.MONGO_ATLAS_USERNAME),
    password: String(process.env.MONGO_ATLAS_PASSWORD),
  };

  const uri = mongoConfig.base_uri
    .replace("<username>", mongoConfig.username)
    .replace("<password>", mongoConfig.password);

  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      autoIndex: true,
    })
    .then(() =>
      console.log("Mongo DB database connection established successfully")
    )
    .catch((error: any) => console.log(error));
};

export default initialMongoConnection;
