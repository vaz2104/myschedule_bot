const ScheduleService = require("../../services/v.2/ScheduleService");

class ScheduleController {
  async create(req, res) {
    try {
      const newObject = await ScheduleService.create(req.body);
      res.json(newObject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getMany(req, res) {
    try {
      const objects = await ScheduleService.getMany(req.query);
      res.json(objects);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const object = await ScheduleService.getOne(req.params?.id);
      res.json(object);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const updatedObject = await ScheduleService.update(
        req.params?.id,
        req.body
      );
      res.json(updatedObject);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedObject = await ScheduleService.delete(req.params?.id);
      res.json(deletedObject);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ScheduleController();
