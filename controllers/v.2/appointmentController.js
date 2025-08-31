const AppointmentService = require("../../services/v.2/AppointmentService");

class AppointmentController {
  async create(req, res) {
    try {
      const appointment = await AppointmentService.create(req.body);
      res.json(appointment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getMany(req, res) {
    try {
      const appointments = await AppointmentService.getMany(req.query);
      res.json(appointments);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const appointment = await AppointmentService.getOne(req.params?.id);
      res.json(appointment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const appointment = await AppointmentService.update(
        req.params?.id,
        req.body
      );
      res.json(appointment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const appointment = await AppointmentService.delete(req.params?.id);
      res.json(appointment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AppointmentController();
