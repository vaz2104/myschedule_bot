require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PanelsInitialization = require("./modules/InitPanels");
const MainBotMethods = require("./modules/MainBotMethods");
const botRouts = require("./routs/v.2/botRouts");
const companyRouts = require("./routs/v.2/companyRouts");
const servicesRouts = require("./routs/v.2/serviceRouts");
const userRouts = require("./routs/v.2/userRouts");
const appointmentRouts = require("./routs/v.2/appointmentRouts");
const authRouts = require("./routs/v.2/authRouts");
const scheduleRouts = require("./routs/v.2/scheduleRouts");

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
  res.json({ message: "Welcome to a MySchedule`s API" });
});
app.use("/api", botRouts);
app.use("/api", companyRouts);
app.use("/api", servicesRouts);
app.use("/api", userRouts);
app.use("/api", appointmentRouts);
app.use("/api", authRouts);
app.use("/api", scheduleRouts);

app.listen(process.env.PORT, () => {
  console.log(`Main bot started and listening on port ${process.env.PORT}`);
});

PanelsInitialization();
