const { json } = require("body-parser");
const formatDate = require("../../lib/formatDate");
const WorkerBotSchedule = require("../../models/v.20/WorkerBotSchedule");
const AppointmentRelations = require("../../models/v.20/AppointmentRelations");
const daysInMonth = require("../../lib/daysInMonth");

class ScheduleService {
  async create(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = JSON.parse(JSON.stringify(options));

    const scheduleDate = `${options.date}T00:00:00.000Z`;
    query.date = scheduleDate;
    const schedule = await WorkerBotSchedule.create(query);

    return schedule;
  }

  async getMany(options) {
    if (!Object.keys(options).length) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = JSON.parse(JSON.stringify(options));

    if (options?.startDate) {
      delete query.startDate;
      query.date = {
        $gte: `${options?.startDate}`,
      };

      if (options?.endDate) {
        delete query.endDate;
        query.date.$lte = `${options?.endDate}`;
      }
    }

    if (options?.date) {
      query.date = {
        $eq: `${options?.date}T00:00:00.000Z`,
      };
    }

    if (!options?.date && !options?.startDate && !options?.endDate) {
      const searchDate = new Date();
      query.date = {
        $gte: `${searchDate.getFullYear()}-${searchDate.getMonth() + 1}-1`,
        $lte: `${searchDate.getFullYear()}-${
          searchDate.getMonth() + 1
        }-${daysInMonth(searchDate.getMonth() + 1, searchDate.getFullYear())}`,
      };
    }

    const schedule = await WorkerBotSchedule.find(query).populate(["workerId"]);
    const ids = [];
    schedule.forEach((el) => ids.push(el._id));

    const relations = await AppointmentRelations.find({
      scheduleId: { $in: ids },
    }).populate(["clientId", "serviceId"]);

    const combinedAnswer = [];

    schedule.forEach((el) => {
      const filteredRelations = relations.filter(
        (rel) => rel.scheduleId.toString() === el._id.toString()
      );

      const newAnswer = { ...el.toJSON() };
      newAnswer.relations = filteredRelations;
      combinedAnswer.push(newAnswer);
    });

    return combinedAnswer;
  }

  async getOne(scheduleId) {
    if (!scheduleId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const schedule = await WorkerBotSchedule.findById(scheduleId);
    return schedule;
  }

  async update(scheduleId, query) {
    if (!scheduleId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const updatedSchedule = await WorkerBotSchedule.findByIdAndUpdate(
      scheduleId,
      query,
      { new: true }
    );

    return updatedSchedule;
  }

  async delete(scheduleId) {
    if (!scheduleId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const deletedSchedule = await WorkerBotSchedule.findByIdAndDelete(
      scheduleId
    );
    return deletedSchedule;
  }
}

module.exports = new ScheduleService();
