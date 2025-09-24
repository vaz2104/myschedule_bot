const TelegramUser = require("../models/v.20/TelegramUser");
const Helpers = require("./Helpers");

class MainBotMethods {
  async initCommand(bot) {
    bot.on("message", async (msg) => {
      const { id: chatId } = msg.from;
      // bot.sendMessage(chatId, `Souy said "${msg.text}!!"`);

      return false;
    });

    bot.onText(/\/start/, async function (msg) {
      const { id: chatId, username, first_name: firstName } = msg.from;
      const dataParts = msg.text.split(" ");

      let telegramUser = await TelegramUser.findOne({ userId: chatId });
      let isNewUser = false;

      try {
        await bot.sendChatAction(chatId, "typing");

        if (!telegramUser) {
          console.log("no telegram user");

          const newUserOptions = {
            username: username || firstName || "",
            userId: chatId,
            firstName,
          };

          const avatars = await bot.getUserProfilePhotos(chatId);

          if (avatars?.photos[0]) {
            newUserOptions.photoUrl = await bot.getFileLink(
              avatars?.photos[0][0]?.file_id
            );
          }

          telegramUser = await TelegramUser.create(newUserOptions);
          isNewUser = true;
        }

        const keyboard = [
          [
            {
              text: "Згенерувати дані",
              callback_data: "generateAuthData",
            },
          ],
        ];

        const authMessage = `\n\nЩоб відкрити адмін панель натисніть кнопку <b>"Панель"</b> \nДля входу в браузері згенеруйте дані для доступу`;

        if (isNewUser) {
          await bot.sendMessage(
            chatId,
            `Привіт ${
              username ? `@${username}` : `<b>${firstName}</b>`
            }!\nВітаємо в <b>MYSCHEDULE</b>${authMessage}`,
            {
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: keyboard,
              },
            }
          );
        } else {
          if (!dataParts[1]) {
            await bot.sendMessage(
              chatId,
              `${
                username ? `@${username}` : `<b>${firstName}</b>`
              }, раді знову бачити!${authMessage}`,
              {
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: keyboard,
                },
              }
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
          "Вибачте, сталася помилка! Повторіть спробу знову!"
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

module.exports = new MainBotMethods();
