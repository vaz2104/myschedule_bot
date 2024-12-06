const CompanySchedule = require("../models/CompanySchedule");
const AppointmentRelations = require("../models/AppointmentRelations");

class ScheduleService {
  async create(options) {
    if (!options?.company_id || !options?.date || !options?.hours) {
      throw new Error("Invalid data was sent"); // 400
    }

    const scheduleDate = `${options.date}T00:00:00.000Z`;
    options.date = scheduleDate;

    const schedule = await CompanySchedule.create(options);

    return schedule;
  }

  async getAll(options) {
    const { companyId, date } = options;
    if (!companyId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const query = {
      company_id: companyId,
    };

    const searchDate = new Date();
    query.date = {
      $gte: `${searchDate.getFullYear()}-${searchDate.getMonth()}-1`,
    };

    if (date) {
      query.date = {
        $eq: `${date}T00:00:00.000Z`,
      };
    }

    const schedule = await CompanySchedule.find(query);
    const ids = [];
    schedule.forEach((el) => ids.push(el._id));

    const relations = await AppointmentRelations.find({
      schedule_id: { $in: ids },
    }).populate(["client_id", "service_id"]);

    const combinedAnswer = [];

    schedule.forEach((el) => {
      const relation = relations.filter(
        (rel) => rel.schedule_id.toString() === el._id.toString()
      );

      const newAnswer = { ...el.toJSON() };
      if (relation.length) newAnswer.relation = relation[0];
      combinedAnswer.push(newAnswer);
    });

    return combinedAnswer;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const schedule = await CompanySchedule.findById(id);

    return schedule;
  }

  async update(options) {
    const { _id, hours } = options;
    if (!_id || !hours) {
      throw new Error("Invalid data was sent"); // 400
    }
    const updatedScheduleItem = await CompanySchedule.findByIdAndUpdate(
      _id,
      options,
      { new: true }
    );

    return updatedScheduleItem;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }
    const deletedScheduleItem = await CompanySchedule.findByIdAndDelete(id);

    return deletedScheduleItem;
  }
}

module.exports = new ScheduleService();
