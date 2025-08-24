const { json } = require("body-parser");
const formatDate = require("../../lib/formatDate");
const WorkerBotSchedule = require("../../models/v.20/WorkerBotSchedule");
const AppointmentRelations = require("../../models/v.20/AppointmentRelations");

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

    if (options?.startDate && options?.endDate) {
      query.date = {
        $gte: `${options?.startDate}T00:00:00.000Z`,
        $lte: `${options?.endDate}T00:00:00.000Z`,
      };
    }

    if (options?.date) {
      query.date = {
        $eq: `${options?.date}T00:00:00.000Z`,
      };
    }

    const searchDate = new Date();
    query.date = {
      $gte: `${searchDate.getFullYear()}-${searchDate.getMonth() + 1}-1`,
    };

    console.log(query);
    const schedule = await WorkerBotSchedule.find(query);
    const ids = [];
    schedule.forEach((el) => ids.push(el._id));

    const relations = await AppointmentRelations.find({
      scheduleId: { $in: ids },
    }).populate(["clientId", "serviceId"]);

    const combinedAnswer = [];

    schedule.forEach((el) => {
      const relation = relations.filter(
        (rel) => rel.scheduleId.toString() === el._id.toString()
      );

      const newAnswer = { ...el.toJSON() };
      if (relation.length) newAnswer.relation = relation[0];
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
