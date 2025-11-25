const TelegramBot = require("node-telegram-bot-api");
const Bot = require("../models/Bot");
const ClientBotRelations = require("../models/ClientBotRelations");
const WorkerBotRelations = require("../models/WorkerBotRelations");

class CompanyService {
  async create(options) {
    let { adminId, token } = options;

    if (!adminId || !token) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Bot.findOne({
      adminId,
      token,
    });

    if (company) {
      throw new Error("Company is already registered"); // 400
    }

    const newCompany = await Bot.create(options);

    if (newCompany) {
      await this.workerRelationCreate({
        botId: newCompany?._id,
        workerId: newCompany?.adminId,
      });
    }

    return newCompany;
  }

  async getAll(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bots = await Bot.find(options);

    const botsData = [];

    for (let item = 0; item < bots.length; item++) {
      const botItem = bots[item];

      let bot = new TelegramBot(botItem.token, {
        polling: false,
      });

      if (!bot) return [];

      const data = await bot.getMe();
      const avatars = await bot.getUserProfilePhotos(data?.id);

      if (avatars?.photos[0]) {
        data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
      }

      botsData.push({ _id: botItem._id, ...data, m: "323" });
    }

    return botsData;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const botData = await Bot.findById(id);
    let bot = new TelegramBot(botData.token, {
      polling: false,
    });

    if (!bot) return [];

    const telegramData = await bot.getMe();
    // console.log(botData);

    return {
      ...JSON.parse(JSON.stringify(botData)),
      ...JSON.parse(JSON.stringify(telegramData)),
    };
  }

  async update(id, options) {
    let { botToken } = options;
    // if (!id || !botToken) {
    //   throw new Error("Invalid data was sent"); // 400
    // }

    const updatedCompany = await Bot.findByIdAndUpdate(id, options, {
      new: true,
    });

    return updatedCompany;
  }

  async getClientRelation(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await ClientBotRelations.find(options).populate([
      "telegramUserId",
    ]);
    return relation;
  }

  async getWorkerRelation(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await WorkerBotRelations.find(options).populate([
      "workerId",
    ]);
    return relation;
  }

  async updateWorkerRelation(id, options) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedRelation = await WorkerBotRelations.findByIdAndUpdate(
      id,
      options,
      {
        new: true,
      }
    );

    return updatedRelation;
  }

  async workerRelationCreate(options) {
    let { botId, workerId } = options;

    if (!botId || !workerId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await WorkerBotRelations.findOne(options);

    if (relation) {
      throw new Error("Relation is already registered"); // 400
    }

    const newRelation = await WorkerBotRelations.create(options);
    return newRelation;
  }

  async clientRelationCreate(options) {
    let { botId, telegramUserId } = options;

    if (!botId || !telegramUserId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await ClientBotRelations.findOne(options);

    if (relation) {
      throw new Error("Relation is already registered"); // 400
    }

    const newRelation = await ClientBotRelations.create(options);
    return newRelation;
  }
  async updateClientRelation(id, options) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedRelation = await ClientBotRelations.findByIdAndUpdate(
      id,
      options,
      {
        new: true,
      }
    );

    return updatedRelation;
  }
}

module.exports = new CompanyService();
