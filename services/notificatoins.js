const TelegramBot = require("node-telegram-bot-api");
const User = require("../models/User");
const Notification = require("../models/Notification");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");
const NotificationUserRelation = require("../models/NotificationUserRelation");

class Notificatoins {
  async createdNewObject(options) {
    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, objectID } = options;

    const realtor = await User.findById(userId);

    if (realtor?.userId) {
      await bot.sendMessage(realtor?.userId, "Вам призначено новий об`єкт", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Переглянути інформацію про об`єкт",
                callback_data: `objectMethods_printInfo-${realtor?.userId}-${objectID}`,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      });
    }

    bot = null;
  }

  async deletedObject(options) {
    return false;
    // console.log(options);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, objectID } = options;

    const realtor = await User.findById(userId);

    if (realtor?.userId) {
      await bot.sendMessage(realtor?.userId, "Вам призначено новий об`єкт", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Переглянути інформацію про об`єкт",
                callback_data: `objectMethods_printInfo-${objectID}`,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      });
    }

    bot = null;
  }

  async realtorProfileStatus(options) {
    // console.log(options);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, chatId, status } = options;

    if (status) {
      await bot.sendMessage(
        chatId,
        "Ваш профіль активовано!\nТепер Ви можете переглядати інформацію про призначені Вам об`єкти",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await bot.sendMessage(
        chatId,
        "Ваш профіль <b>заблоковано</b>, та всі Ваші дії в боті обмежені!\n ",
        {
          parse_mode: "HTML",
        }
      );
    }

    bot = null;
  }

  async createdNewRealtor() {
    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const realtors = await User.find({
      role: "admin",
    });

    if (realtors?.length) {
      Promise.all(
        realtors.map(async (realtor) => {
          if (realtor?.userId) {
            await bot.sendMessage(
              realtor?.userId,
              "У боті зареєструвався новий рієлтор!\n\nПерейдіть в адмін-панель та перевірте дані користувача",
              {
                parse_mode: "HTML",
              }
            );
          }
        })
      ).then(() => {
        return console.log("Success!");
      });
    }

    bot = null;
  }

  async updatedObject({
    author,
    oldObjectVersion,
    newObjectVersion,
    updatedFields,
  }) {
    const changes = [];

    Object.keys(updatedFields).forEach((option) => {
      changes.push({
        option,
        oldVestion: oldObjectVersion[option],
        newVersion: newObjectVersion[option],
      });
    });

    const newNotification = await Notification.create({
      author: author,
      realEstate: newObjectVersion?._id,
      metadata: JSON.stringify(changes),
      date: new Date(dateUkrainTZ),
      timestamp: Date.now(),
    });

    const admins = await User.find({
      role: "admin",
      isActivated: true,
    });

    Promise.all(
      admins.map(async (admin) => {
        await NotificationUserRelation.create({
          notification: newNotification?._id,
          recipient: admin?._id,
          createdAt: new Date(dateUkrainTZ),
          timestamp: Date.now(),
        });
      })
    ).then(() => {
      return console.log("Success!");
    });
  }

  async createdNewObjectByRealtor({ objectID, author }) {
    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const admins = await User.find({
      role: "admin",
      isActivated: true,
    });

    const newNotification = await Notification.create({
      author: author?._id,
      realEstate: objectID,
      message: "Додано новий об`єкт",
      date: new Date(dateUkrainTZ),
      timestamp: Date.now(),
    });

    Promise.all(
      admins.map(async (admin) => {
        await NotificationUserRelation.create({
          notification: newNotification?._id,
          recipient: admin?._id,
          createdAt: new Date(dateUkrainTZ),
          timestamp: Date.now(),
        });

        await bot.sendMessage(
          admin?.userId,
          `${author?.firstName} (@${author?.username}) додав новий об\`єкт`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Переглянути інформацію про об`єкт",
                    callback_data: `objectMethods_printInfo-${admin?.userId}-${objectID}`,
                  },
                ],
              ],
              one_time_keyboard: true,
            },
          }
        );
      })
    ).then(() => {
      return console.log("Success!");
    });
  }

  bot = null;
}

module.exports = new Notificatoins();
