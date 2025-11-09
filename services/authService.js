const generateRandomKey = require("../lib/generateRandomKey");
const Auth = require("../models/Auth");
const InviteLink = require("../models/InviteLink");
const TelegramUserService = require("./telegramUserService");

class AuthService {
  async createKey(options) {
    if (!options?.telegramUserId) {
      throw new Error("Invalid data was sent"); // 400
    }

    await Auth.deleteMany({ telegramUserId: options?.telegramUserId });

    options.key = generateRandomKey(5, true);
    const authData = await Auth.create(options);

    return authData;
  }
  async deleteKey(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const authData = await Auth.findByIdAndDelete(id);

    return authData;
  }

  async createInviteLink(options) {
    if (!options?.botId) {
      throw new Error("Invalid data was sent");
    }

    options.key = generateRandomKey(16, true);
    const authData = await InviteLink.create(options);
    return authData?.key;
  }

  async deleteInviteLink(id) {
    if (!id) {
      throw new Error("Invalid data was sent");
    }

    const authData = await InviteLink.findByIdAndDelete(id);
    return authData;
  }

  async login(options) {
    if (!options?.username || !options.key) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUserService.getAll({
      username: options?.username,
    });

    // console.log("telegramUser", telegramUser);

    if (telegramUser?.length !== 1) return null;

    const authData = await Auth.findOne({
      telegramUserId: telegramUser[0]._id,
      key: options.key,
    });
    // console.log("authData", authData);

    if (!authData) return null;

    await Auth.deleteMany({ telegramUserId: telegramUser[0]._id });

    return telegramUser[0];
  }
}

module.exports = new AuthService();
