const AppointmentService = require("../services/appointmentService");

class ServicesController {
  async create(req, res) {
    try {
      const appointment = await AppointmentService.create(req.body);
      res.json(appointment);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllByClientId(req, res) {
    try {
      const appointments = await AppointmentService.getAllByClientId(
        req.query?.clientId
      );
      res.json(appointments);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllByCompanyId(req, res) {
    try {
      const appointments = await AppointmentService.getAllByCompanyId(
        req.query?.companyId
      );
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
      const appointment = await AppointmentService.update(req.body);
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

module.exports = new ServicesController();
