const Company = require("../models/Company");

class CompanyService {
  async create(options) {
    let { username, userId, botToken } = options;

    if (!username || !userId || !botToken) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Company.findOne({
      userId,
    });

    if (company) {
      throw new Error("Company is already registered"); // 400
    }

    const newCompany = await Company.create(options);
    return newCompany;
  }

  async getAllOrCompanyId(id) {
    if (id) {
      const company = await Company.findOne({
        userId: id,
      });
      return company;
    }

    const companies = await Company.find();
    return companies;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Company.findById(id);
    return company;
  }

  async update(_id, options) {
    let { botToken } = options;
    if (!_id || !botToken) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedCompany = await Company.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return updatedCompany;
  }
}

module.exports = new CompanyService();
