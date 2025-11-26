require("dotenv").config();
const { fork } = require("child_process");

async function NewPanel(botId, botToken, botPort) {
  // console.log(botConfig);

  console.log(`Запускаємо ${botId}...`);
  // const port = 4100 + index + 1;
  const botProcess = fork(
    "./modules/Panel.js",
    [botToken, botPort, botId]
    // { silent: true }
  );

  // Логування повідомлень з процесу бота
  botProcess.on("message", (message) => {
    console.log(`Повідомлення від ${botId}:`, message);
  });

  // Обробка завершення процесу
  botProcess.on("exit", (code) => {
    console.log(`Процес ${botId} завершився з кодом: ${code}`);
  });
}

module.exports = NewPanel;
