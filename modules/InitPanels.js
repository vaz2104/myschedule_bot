require("dotenv").config();
const Bot = require("../models/Bot");
const NewPanel = require("./NewPanel");

async function PanelsInitialization() {
  try {
    const tokens = await Bot.find({}, ["token", "port"]);

    if (!tokens.length) return;

    tokens.forEach((botConfig) => {
      NewPanel(botConfig._id, botConfig.token, botConfig.port);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = PanelsInitialization;
