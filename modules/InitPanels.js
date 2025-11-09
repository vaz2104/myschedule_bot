require("dotenv").config();
const { fork } = require("child_process");
const Bot = require("../models/v.20/Bot");

async function PanelsInitialization() {
  try {
    const tokens = await Bot.find({}, "token");

    if (!tokens.length) return;

    tokens.forEach((botConfig, index) => {
      console.log(`Запускаємо ${botConfig._id}...`);
      const port = 3000 + index + 1;
      const botProcess = fork(
        "./modules/Panel.js",
        [botConfig.token, port, botConfig._id]
        // { silent: true }
      );

      // Логування повідомлень з процесу бота
      botProcess.on("message", (message) => {
        console.log(`Повідомлення від ${botConfig._id}:`, message);
      });

      // Обробка завершення процесу
      botProcess.on("exit", (code) => {
        console.log(`Процес ${botConfig._id} завершився з кодом: ${code}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = PanelsInitialization;
