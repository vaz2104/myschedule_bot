const formatDate = require("../lib/formatDate");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");
const ClientBotRelations = require("../models/ClientBotRelations");
const Notification = require("../models/Notification");
const NotificationUserRelation = require("../models/NotificationUserRelation");
const TelegramNotifications = require("../modules/TelegramNotifications");
const CompanyService = require("./companyService");

class ServiceService {
  async create(query) {
    let options = JSON.parse(JSON.stringify(query));
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    let recipients = options?.recipient;

    if (
      options?.type === "clientNewAppointment" ||
      options?.type === "clientCancelAppointment"
    ) {
      if (!options?.recipient) {
        const companyData = await CompanyService.getOne(
          options.notification.botId
        );
        recipients = [companyData?.adminId];
        options.recipient = companyData?.adminId;
      }
    }

    switch (options?.type) {
      case "newDiscount":
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
        options.notification.message = `Новий запис на прийом!`;

        options.notification.metadata = JSON.stringify({
          notificationType: options?.type,
          messageOptions: {
            date: options?.meta?.scheduleId?.date,
            time: options?.meta?.scheduleId?.schedule[
              options?.meta?.appointmentKey
            ],
            firstName: options?.meta?.clientId?.firstName,
            username: options?.meta?.clientId?.username,
            service: options?.meta?.serviceId?.service,
            priceWithSale: options?.meta?.serviceId?.priceWithSale,
            price: options?.meta?.serviceId?.price,
          },
        });

        break;
      case "clientCancelAppointment":
        options.notification.message = `Запис скасовано!`;

        options.notification.metadata = JSON.stringify({
          notificationType: options?.type,
          messageOptions: {
            date: options?.meta?.scheduleId?.date,
            time: options?.meta?.scheduleId?.schedule[
              options?.meta?.appointmentKey
            ],
            firstName: options?.meta?.clientId?.firstName,
            username: options?.meta?.clientId?.username,
          },
        });
        break;
      case "adminCancelAppointment":
        options.notification.message = `Ваш запис скасовано!`;

        options.notification.metadata = JSON.stringify({
          notificationType: options?.type,
          messageOptions: {
            date: options?.meta?.scheduleId?.date,
            time: options?.meta?.scheduleId?.schedule[
              options?.meta?.appointmentKey
            ],
            firstName: options?.meta?.clientId?.firstName,
            username: options?.meta?.clientId?.username,
          },
        });
        break;
    }
    console.log(options);

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
                  await TelegramNotifications.newAppointment(options?.meta);
                  break;
                case "clientCancelAppointment":
                  await TelegramNotifications.clientCancelAppointment(
                    options?.meta
                  );
                  break;
                case "adminCancelAppointment":
                  await TelegramNotifications.adminCancelAppointment(
                    options?.meta
                  );
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

  async getAll(query) {
    const objects = await NotificationUserRelation.find(query)
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
        recipient: query?.recipient,
        isOpened: false,
      },
      { isOpened: true, openedDate: new Date(dateUkrainTZ) }
    );

    return objects;
  }
}

module.exports = new ServiceService();
