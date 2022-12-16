import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import initialMongoConnection from "./config/database";
// import socketMain from "./socket.io/socketMain";
import cors from "cors";

const app = express();
require("dotenv").config();


const httpServer = createServer(app);
initialMongoConnection();

app.use(cors());
app.use(express.json());

const routes = require("./routes/index");
app.use(routes);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// io.on("connection", socketMain);

const port = process.env.PORT || 9000;

httpServer.listen(port);