const Client = require("../models/Client");
const ClientService = require("../services/clientService");

class ClientController {
  async create(req, res) {
    try {
      const newClient = await ClientService.create(req.body);
      res.json(newClient);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const clients = await ClientService.getAll();
      res.json(clients);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const client = await ClientService.getOne(req.params?.id);

      if (!client)
        return res.status(404).json({ message: "Client was not found" });

      res.json(client);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const client = await ClientService.update(req.body);
      res.json(client);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ClientController();
