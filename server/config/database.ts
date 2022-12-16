import mongoose from "mongoose";

const mongoConfig = {
  base_uri: process.env.MONGO_ATLAS_URI || 'root',
  username: process.env.MONGO_ATLAS_USERNAME || 'root',
  password: process.env.MONGO_ATLAS_PASSWORD || '',
};
console.log(mongoConfig)

const uri = mongoConfig.base_uri
  .replace("<username>", mongoConfig.username )
  .replace("<password>", mongoConfig.password);

const initialMongoConnection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri)
    .then(() =>
      console.log("Mongo DB database connection established successfully")
    )
    .catch((error:any) => console.log(error));
};

export default initialMongoConnection
