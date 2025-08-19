const Bot = require("../../models/v.20/Bot");

class CompanyService {
  async create(options) {
    let { adminId, botToken } = options;

    if (!adminId || !botToken) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Bot.findOne({
      adminId,
    });

    if (company) {
      throw new Error("Company is already registered"); // 400
    }

    const newCompany = await Bot.create(options);
    return newCompany;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Bot.findById(id);
    return company;
  }

  async update(id, options) {
    let { botToken } = options;
    if (!id || !botToken) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, options, {
      new: true,
    });

    return updatedCompany;
  }
}

module.exports = new CompanyService();
