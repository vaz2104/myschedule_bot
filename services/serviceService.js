const Company = require("../models/Company");
const CompanyService = require("../models/CompanyService");
const formatDate = require("../lib/formatDate");

class ServiceService {
  async create(options) {
    if (!options?.company_id || !options?.service) {
      throw new Error("Invalid data was sent"); // 400
    }

    if (options?.saleEndDay) {
      const saleDate = new Date(options?.saleEndDay);
      const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

      options.saleEndDay = filteredDate;
    }

    const newService = await CompanyService.create(options);

    return newService;
  }

  async getAll(companyId) {
    if (!companyId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const company = await Company.findById(companyId);

    if (!company) {
      throw new Error("Company was not found"); // 404
    }

    const services = await CompanyService.find({
      company_id: companyId,
    }).exec();

    return services;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const service = await CompanyService.findById(id);
    return service;
  }

  async update(options) {
    if (!options?._id || !options?.service) {
      throw new Error("Invalid data was sent"); // 400
    }

    if (options.saleEndDay) {
      const saleDate = new Date(options.saleEndDay);
      const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

      options.saleEndDay = filteredDate;
    }

    const updatedService = await CompanyService.findByIdAndUpdate(
      options?._id,
      options,
      { new: true }
    );
    return updatedService;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedService = await CompanyService.findByIdAndDelete(id);
    return deletedService;
  }
}

module.exports = new ServiceService();
