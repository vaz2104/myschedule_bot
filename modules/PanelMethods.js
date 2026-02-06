const ClientBotRelations = require("../models/ClientBotRelations");
const TelegramUser = require("../models/TelegramUser");
const Helpers = require("./Helpers");

class PanelMethods {
  async initCommand(bot, botId) {
    bot.on("message", async (msg) => {
      // const { id: chatId } = msg.from;
      // bot.sendMessage(chatId, `Souy said "${msg.text}"`);

      return false;
    });

    bot.onText(/\/start/, async function (msg) {
      const {
        id: chatId,
        username,
        first_name: firstName,
        last_name: lastName,
      } = msg.from;

      const dataParts = msg.text.split(" ");

      const telegramUserResponse = await TelegramUser.findOne({
        userId: chatId,
      });
      let telegramUser = telegramUserResponse || null;
      let isNewUser = false;

      const botData = await bot.getMe();

      try {
        await bot.sendChatAction(chatId, "typing");

        if (!telegramUser) {
          console.log("no telegram user");

          const newUserOptions = {
            username: username || firstName || "",
            userId: chatId,
            firstName: firstName || "",
            lastName: lastName || "",
          };

          const avatars = await bot.getUserProfilePhotos(chatId);

          if (avatars?.photos[0]) {
            newUserOptions.photoUrl = await bot.getFileLink(
              avatars?.photos[0][0]?.file_id,
            );
          }

          telegramUser = await TelegramUser.create(newUserOptions);
        }

        console.log("active telegram user");

        let isUserClient = await ClientBotRelations.find({
          botId,
          telegramUserId: telegramUser?._id,
        });

        if (!isUserClient.length) {
          console.log("telegram user is not a client");

          await ClientBotRelations.create({
            botId,
            telegramUserId: telegramUser?._id,
            firstName: firstName || "",
            lastName: lastName || "",
          });
          isNewUser = true;
        }

        console.log("telegram user has relationship");

        if (isNewUser) {
          await bot.sendMessage(
            chatId,
            `Привіт ${
              username ? `@${username}` : `<b>${firstName}</b>`
            }!\nВітаємо в <b>${botData.first_name}</b>`,
            {
              parse_mode: "HTML",
            },
          );
        } else {
          if (!dataParts[1]) {
            await bot.sendMessage(
              chatId,
              `${
                username ? `@${username}` : `<b>${firstName}</b>`
              }, раді знову бачити!`,
              {
                parse_mode: "HTML",
              },
            );
          }
        }

        if (dataParts.length > 1) {
          Helpers.callbacksSwitcher(dataParts[1], bot, {
            chatId,
            username,
          });
          return;
        }

        return false;
      } catch (error) {
        console.log(error);

        await bot.sendMessage(
          chatId,
          `Вибачте, сталася помилка! Повторіть спробу знову! ${error}`,
        );
      }
    });
  }

  async callbackListener(bot) {
    bot.on("callback_query", async (callbackData) => {
      const { data } = callbackData;
      const { id, username } = callbackData.from;

      Helpers.callbacksSwitcher(data, bot, { chatId: id, username });
    });
  }
}

module.exports = new PanelMethods();
