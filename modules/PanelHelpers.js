const PanelCallbacks = require("./PanelCallbacks");

class PanelHelpers {
  checkCommand(commandData, bot, options) {
    const commandParts = commandData.split("_");
    console.log(`Command Query => ${commandParts}`);

    const commandName = commandParts[0];
    const commandOptions = commandParts[1];

    switch (commandName) {
      case "inviteWorker":
        PanelCallbacks.inviteTeacher(commandOptions, bot, options);
        break;
    }
  }
  async checkCallbacks(callbackData, bot, options) {
    const dataParts = callbackData.split("_");
    console.log(`Callback Query => ${dataParts}`);

    const callbackName = dataParts[0];
    const callbackOptions = commandParts[1];

    switch (callbackName) {
      case "generateAuthData":
        await PanelCallbacks.generateAuthData(bot, options);
        break;
    }
  }
}

module.exports = new PanelHelpers();
