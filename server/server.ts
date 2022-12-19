import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import initialMongoConnection from "./config/database";
import cors from "cors";
import routes from "./routes/index";
import * as dotenv from "dotenv";
import { errorHandler } from "./errors/errorHandler";
// import ErrorHandler from "./middlewares/ErrorHandler";
dotenv.config({ path: "./.env" });

const app = express();
const httpServer = createServer(app);
const SOCKER_SERVER_PORT = process.env.PORT || 9000;
const SERVER_PORT = 8100;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
// app.use(ErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// start database connection
initialMongoConnection();

// start socket server connection
httpServer.listen(SOCKER_SERVER_PORT);
app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));
