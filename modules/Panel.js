const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PanelMethods = require("./PanelMethods");
const mongoose = require("mongoose");

const token = process.argv[2];
const port = process.argv[3];
const botId = process.argv[4];

// console.log(process.argv);

if (!token) {
  console.error("Token was not provided!");
  process.exit(1);
}

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DB connected`);
  } catch (error) {
    console.log(`Error whyle init Bot Panel ${error}`);
  }
}

init();

const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
const app = express();

PanelMethods.initCommand(bot, botId);
PanelMethods.callbackListener(bot);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to a child proccess on port:${port}` });
});
app.listen(port, () => {
  console.log(`Bot panel listening on port ${port}`);
});
