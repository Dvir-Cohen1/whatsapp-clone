import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import initialMongoConnection from "./config/database";
// import socketMain from "./socket.io/socketMain";
import cors from "cors";

const app = express();
import * as dotenv from "dotenv";
import authRoute from "./routes/authentication.routes";
// import authRoute from './routes/authRoute.js';

dotenv.config({ path: "./.env" }); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const httpServer = createServer(app);
initialMongoConnection();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("Server Running!");
});

app.use(authRoute);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// io.on("connection", socketMain);

const SOCKER_SERVER_PORT = process.env.PORT || 9000;
const SERVER_PORT = 8100;

httpServer.listen(SOCKER_SERVER_PORT);
app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));
