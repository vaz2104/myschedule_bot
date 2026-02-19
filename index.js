require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PanelsInitialization = require("./modules/InitPanels");
const MainBotMethods = require("./modules/MainBotMethods");
const botRouts = require("./routs/botRouts");
const companyRouts = require("./routs/companyRouts");
const servicesRouts = require("./routs/serviceRouts");
const userRouts = require("./routs/userRouts");
const appointmentRouts = require("./routs/appointmentRouts");
const authRouts = require("./routs/authRouts");
const scheduleRouts = require("./routs/scheduleRouts");
const notificationRouts = require("./routs/notificationRouts");
const workerRouts = require("./routs/workerRouts");
const hintsRouts = require("./routs/hintsRouts");
const clientHintsRouts = require("./routs/clientHintsRouts");

require("dotenv").config();

const app = express();

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DB connected`);
  } catch (error) {
    console.log(`Error whyle init project ${error}`);
  }
}

init();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

MainBotMethods.initCommand(bot);
MainBotMethods.callbackListener(bot);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to a MySchedule`s API" });
});
app.use("/api", botRouts);
app.use("/api", companyRouts);
app.use("/api", servicesRouts);
app.use("/api", userRouts);
app.use("/api", appointmentRouts);
app.use("/api", authRouts);
app.use("/api", scheduleRouts);
app.use("/api", notificationRouts);
app.use("/api", workerRouts);
app.use("/api", hintsRouts);
app.use("/api", clientHintsRouts);

// app.listen(process.env.PORT, () => {
//   console.log(`Main bot started and listening on port ${process.env.PORT}`);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Main bot started and listening on port ${PORT}`);
});

PanelsInitialization();
