const TelegramUser = require("../models/v.20/TelegramUser");

class MainBotMethods {
  async initCommand(bot) {
    bot.on("message", async (msg) => {
      const { id: chatId } = msg.from;
      bot.sendMessage(chatId, `Souy said "${msg.text}!!"`);

      return false;
    });

    bot.onText(/\/start/, async function (msg) {
      const { id: userId, username, first_name: firstName } = msg.from;
      const dataParts = msg.text.split(" ");

      let telegramUser = await TelegramUser.findOne({ userId });
      let isNewUser = false;

      console.log(telegramUser);

      try {
        await bot.sendChatAction(userId, "typing");

        if (!telegramUser) {
          console.log("no telegram user");

          const newUserOptions = {
            username: username || firstName || "",
            userId,
            firstName,
          };

          console.log(newUserOptions);

          const avatars = await bot.getUserProfilePhotos(userId);

          if (avatars?.photos[0]) {
            newUserOptions.photoUrl = await bot.getFileLink(
              avatars?.photos[0][0]?.file_id
            );
          }

          telegramUser = await TelegramUser.create(newUserOptions);
          isNewUser = true;
        }

        if (isNewUser) {
          await bot.sendMessage(
            userId,
            `Привіт ${
              username ? `@${username}` : `<b>${firstName}</b>`
            }!\nВітаємо в <b>MYSCHEDULE</b>`,
            {
              parse_mode: "HTML",
            }
          );
        } else {
          if (!dataParts[1]) {
            await bot.sendMessage(
              userId,
              `Привіт ${
                username ? `@${username}` : `<b>${firstName}</b>`
              }!\nРаді знову бачити!`,
              {
                parse_mode: "HTML",
              }
            );
          }
        }

        if (dataParts.length > 1) {
          // PanelHelpers.checkCommand(dataParts[1], bot, {
          //   telegramUserId: telegramUser._id,
          //   chatUserId: userId,
          // });
          return;
        }

        return false;
      } catch (error) {
        console.log(error);

        await bot.sendMessage(
          userId,
          "Вибачте, сталася помилка! Повторіть спробу знову!"
        );
      }
    });
  }

  async callbackListener(bot) {
    bot.on("callback_query", async (callbackData) => {
      const { data } = callbackData;
      const userObject = callbackData.from;

      // userObject
      //   {
      //     id: ,
      //     is_bot: false,
      //     first_name: '',
      //     username: '',
      //     language_code: 'uk'
      //   }

      // PanelHelpers.checkCallbacks(data, bot, {
      //   userObject,
      // });
    });
  }
}

module.exports = new MainBotMethods();
