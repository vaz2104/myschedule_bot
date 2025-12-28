const formatDate = require("../lib/formatDate");

class TelegramMessages {
  newServiceDiscount(service, price, priceWithSale, saleEndDay) {
    const message = `Шановний клієнте, у нас нова знижка на послугу <b>"${service}"</b>!\n
    Ми знизили ціну з <b>${price} грн</b> до <b>${priceWithSale} грн</b>!\n
    Акція діє до <b>${formatDate(saleEndDay)}</b>\n
    Встигніть скористатися нагодою, переходьте в панель та обирайте вільне місце☺️\n
    Чекаємо на Вас🥰`;

    return message;
  }

  newService(service, price, priceWithSale, saleEndDay) {
    let message = `Шановний клієнте, у нас стартує нова послуга <b>"${service}"</b>!\n`;

    if (!priceWithSale && !saleEndDay) {
      message += `Їі вартість становить <b>${price} грн</b>\n
      Скористайтесь послугою! Переходьте в панель та обирайте вільне місце 🥰\nЧекаємо на Вас🥰\n`;
    } else {
      message += `
      Також зараз діє знижка <b>${Math.ceil(
        (priceWithSale * 100) / price
      )}%</b> на дану послугу!\n 
      Ми знизили ціну з <s>${price} грн</s> до <b>${priceWithSale} грн</b>!\n
      Акція діє до <b><u>${formatDate(saleEndDay)}</u></b>\n
      Встигніть скористатися нагодою, переходьте в панель та обирайте вільне місце☺️\n
      Чекаємо на Вас🥰
      `;
    }

    return message;
  }

  newAppointment(
    firstName,
    username,
    date,
    time,
    service,
    price,
    priceWithSale
  ) {
    const message = `✅ Новий запис на прийом\n`;

    const clientInfo = `👤 <b>Клієнт:</b>\n${firstName} ${
      username ? `@${username}` : ""
    }\n`;

    const scheduleInfo = `🗓 <b>Зарезервоване місце:</b>\n${formatDate(
      date
    )}, ${time}\n`;

    const serviceInfo = service
      ? `📌 <b>Обрана послуга:</b>\n<u>${service}</u>\n${
          priceWithSale
            ? `💰<b>Активна знижка:</b>\n <b>${priceWithSale}</b> <s>${price}</s>`
            : `💰<b>${price}</b>`
        }`
      : ``;

    const fullMessage = `${message}${clientInfo}${scheduleInfo}${serviceInfo}`;

    return fullMessage;
  }

  adminCancelAppointment(date, time) {
    console.log(date, time);

    const message = `🚫 <b>Скасовано запис на прийом!</b>\n\n`;

    const scheduleInfo = `Адміністратор скасував Ваш прийом на зарезервоване місце:\n🗓 <b><u>${formatDate(
      date
    )}</u></b>, 🕗 <b><u>${time}</u></b>\n`;

    const fullMessage = `${message}${scheduleInfo}`;

    return fullMessage;
  }

  clientCancelAppointment(firstName, username, date, time) {
    const message = `🚫 <b>Скасовано запис на прийом!</b>\n`;

    const clientInfo = `👤 <b>Клієнт:</b>\n${firstName} ${
      username ? `@${username}` : ""
    }\n`;

    const scheduleInfo = `🗓 <b>Зарезервоване місце:</b>\n${formatDate(
      date
    )}, ${time}\n`;

    const fullMessage = `${message}${clientInfo}${scheduleInfo}`;

    return fullMessage;
  }
}

module.exports = new TelegramMessages();
