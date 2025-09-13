const formatDate = require("../../lib/formatDate");
const dateUkrainTZ = require("../../lib/getCurrentDateUkrainTimeZone");
const ClientBotRelations = require("../../models/v.20/ClientBotRelations");
const Notification = require("../../models/v.20/Notification");
const NotificationUserRelation = require("../../models/v.20/NotificationUserRelation");
const TelegramNotifications = require("../../modules/TelegramNotifications");

class ServiceService {
  async create(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    // {
    //   notification: {
    //     botId: '68aa1605ce6fe23eb6c235d1',
    //     author: '68a4ca8db05dc37d70b96ce3'
    //   },
    //   recipientRole: 'client',
    //   type: 'newDiscount'
    // }

    let recipients = options?.recipient;

    switch (options?.type) {
      case "newDiscount":
        console.log("newDiscount");
        const { _id, service, price, priceWithSale, saleEndDay } =
          options?.meta;

        options.notification.message = `У нас нова знижка на послугу`;
        options.notification.metadata = JSON.stringify({
          notificationType: options?.type,
          messageOptions: {
            serviceId: _id,
            service,
            price,
            priceWithSale,
            saleEndDay,
          },
        });

        const clients = await ClientBotRelations.find(
          { botId: options?.notification?.botId },
          { _id: 1 }
        );

        const clientsIDs = [];
        clients.forEach((client) => {
          clientsIDs.push(client?._id);
        });

        recipients = clientsIDs;

        break;
      case "clientNewAppointment":
        console.log("clientNewAppointment");

        break;
      case "clientCancelAppointment":
        console.log("clientCancelAppointment");

        break;
      case "adminCancelAppointment":
        console.log("adminCancelAppointment");

        break;
    }
    // console.log(recipients);
    // console.log(options);
    // return false;
    const newNotification = await Notification.create(options?.notification);

    if (newNotification?._id) {
      if (recipients && Array.isArray(recipients)) {
        await Promise.all(
          recipients.map(async (id) => {
            const relation = await NotificationUserRelation.create({
              notification: newNotification?._id,
              recipient: id,
              recipientRole: options?.recipientRole,
            });

            if (relation?._id) {
              switch (options?.type) {
                case "newDiscount":
                  await TelegramNotifications.newServiceDiscount(options?.meta);
                  break;
                case "clientNewAppointment":
                  console.log("clientNewAppointment");
                  break;
                case "clientCancelAppointment":
                  console.log("clientCancelAppointment");
                  break;
                case "adminCancelAppointment":
                  console.log("adminCancelAppointment");
                  break;
              }
            }
          })
        ).then(() => {
          console.log("Notifications have been sent");
        });
      }
    }

    return newNotification;
  }

  async getAll(id) {
    const objects = await NotificationUserRelation.find({
      recipient: id,
    })
      .sort([["timestamp", -1]])
      .populate(["notification", "recipient"])
      .populate({
        path: "notification",
        populate: [
          {
            path: "author",
            model: "TelegramUser",
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
}

module.exports = new ServiceService();
