import express from "express";
import crypto from "crypto"
import moment from "moment";
import io from "socket.io-client";
import dotenv from "dotenv"
dotenv.config()

//create a server object:
const app = express();
const port = 3000;

const BASE_URL = "https://api.thirdfi.org";

const THIRDFI_API_KEY = "";
const THIRDFI_SEC_KEY = "";


const timeStamp = moment().unix();
const baseString = `${BASE_URL}/ws/&emit=price_feed&timestamp=${timeStamp}`;
const hash = crypto
  .createHmac("sha256", THIRDFI_SEC_KEY)
  .update(baseString)
  .digest("hex");

const socket = io(BASE_URL, {
  path: `/ws/`,
  extraHeaders: {
    "x-sec-key": THIRDFI_API_KEY,
    "x-sec-sign": hash,
    "x-sec-ts": timeStamp,
  },
  transport: ["polling"],
  reconnection: true,
  autoConnect: true,
});

socket.on("connect", () => {
  // // Listen to Room by Network and its pair
  socket.emit("joinRoom", {
    network: "POLYGON",
    pair: "ETHUSD",
  });
});

socket.on("joinRoom", async (msg) => {
  console.log("ROOM", msg);
  // Expected Output
  // ROOM { Answer: 30369.47, Pair: 'BNB-BTCUSD' }
});

socket.on("message", (msg) => {
  console.log("[Message]:", msg);
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
