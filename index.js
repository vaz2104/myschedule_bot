require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const appointmentRouts = require("./routs/appointmentRouts");
const clientRouts = require("./routs/clientRouts");
const companyRouts = require("./routs/companyRouts");
const scheduleRouts = require("./routs/scheduleRouts");
const serviceRouts = require("./routs/serviceRouts");
const notificationRouts = require("./routs/notificationRouts");
const botRouts = require("./routs/botRouts");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const token = process.env.TOKEN;
const port = process.env.PORT || 3000;

if (!token) {
  console.error("Token was not provided!");
  process.exit(1);
}

const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

main();

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB connected");
  } catch (error) {
    console.log(`Error whyle init project ${error}`);
  }
}

const app = express();

bot.on("message", async (msg) => {
  const { id: chatId } = msg.from;
  bot.sendMessage(chatId, `Souy said "${msg.text}"`);

  return false;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "/public")));
app.post("/", cors(), (req, res) => {
  res.json({ m: "hello" });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.APP_URL || "*"}`);
  next();
});

app.use("/api", appointmentRouts);
app.use("/api", clientRouts);
app.use("/api", scheduleRouts);
app.use("/api", serviceRouts);
app.use("/api", companyRouts);
app.use("/api", notificationRouts);
app.use("/api", botRouts);

app.listen(port, () => {
  console.log(`Listening! on port ${port}`);
});
