const Callbacks = require("./Callbacks");

class PanelHelpers {
  callbacksSwitcher(callbackData, bot, options) {
    const dataParts = callbackData.split("_");
    console.log(`Command Query => ${dataParts}`);

    const callbackName = dataParts[0];
    const callbackOptions = dataParts[1];

    switch (callbackName) {
      case "inviteWorker":
        Callbacks.inviteWorker(bot, options, callbackOptions);
        break;
      case "generateAuthData":
        Callbacks.generateAuthData(bot, options);
        break;
    }
  }
}

module.exports = new PanelHelpers();
