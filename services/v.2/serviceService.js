const formatDate = require("../../lib/formatDate");
const CompanyService = require("../../models/v.20/CompanyService");

class ServiceService {
  async create(options) {
    if (!options?.botId || !options?.service) {
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

  async getAll(query) {
    if (!query) {
      throw new Error("Invalid data was sent"); // 400
    }

    const today = new Date();
    await CompanyService.updateMany(
      {
        saleEndDay: { $lt: today },
      },
      {
        sale: "",
        saleEndDay: null,
      }
    ).exec();

    const services = await CompanyService.find(query).exec();

    return services;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const service = await CompanyService.findById(id);
    return service;
  }

  async update(serviceId, options) {
    if (!serviceId) {
      throw new Error("Invalid data was sent"); // 400
    }

    if (options?.saleEndDay) {
      const saleDate = new Date(options?.saleEndDay);
      const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

      options.saleEndDay = filteredDate;
    }

    const updatedService = await CompanyService.findByIdAndUpdate(
      serviceId,
      options,
      { new: true }
    );
    return updatedService;
  }

  async delete(serviceId) {
    if (!serviceId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedService = await CompanyService.findByIdAndDelete(serviceId);
    return deletedService;
  }
}

module.exports = new ServiceService();
