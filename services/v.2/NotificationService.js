const formatDate = require("../../lib/formatDate");
const CompanyService = require("../../models/v.20/CompanyService");
const Notification = require("../../models/v.20/Notification");
const NotificationUserRelation = require("../../models/v.20/NotificationUserRelation");
const TelegramNotifications = require("../../modules/TelegramNotifications");

class ServiceService {
  async create(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newService = await Notification.create(options);

    // author;
    // message;
    // metadata;

    // recipient;

    return newService;
  }

  async getAll(id) {
    const objects = await NotificationUserRelation.find({
      recipient: id,
    })
      .sort([["timestamp", -1]])
      .populate(["notification"])
      .populate({
        path: "notification",
        populate: [
          {
            path: "author",
            model: "User",
          },
          {
            path: "realEstate",
            model: "RealEstate",
          },
        ],
      });

    await NotificationUserRelation.updateMany(
      {
        recipient: id,
        isOpened: false,
      },
      { isOpened: true, openedDate: new Date(dateUkrainTZ) }
    );

    return objects;
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

    const { query, hasNotification } = options;

    const oldServiceState = await CompanyService.findById(serviceId);

    if (query?.saleEndDay) {
      const saleDate = new Date(query?.saleEndDay);
      const filteredDate = `${formatDate(saleDate)}T00:00:00.000Z`;

      query.saleEndDay = filteredDate;
    }

    const updatedService = await CompanyService.findByIdAndUpdate(
      serviceId,
      query,
      { new: true }
    );

    // const isDiscountUpdated =
    //   formatDate(oldServiceState?.saleEndDay) !==
    //     formatDate(options?.saleEndDay) ||
    //   oldServiceState?.priceWithSale != options?.priceWithSale;

    if (hasNotification) {
      await TelegramNotifications.newServiceDiscount(
        oldServiceState,
        updatedService
      );
    }

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
