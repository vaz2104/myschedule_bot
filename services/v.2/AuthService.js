const generateRandomKey = require("../../lib/generateRandomKey");
const InviteLink = require("../../models/v.20/InviteLink");

class AuthService {
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
}

module.exports = new AuthService();
