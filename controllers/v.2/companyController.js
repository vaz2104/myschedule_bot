const CompanyService = require("../../services/v.2/CompanyService");

class CompanyController {
  async create(req, res) {
    try {
      const company = await CompanyService.create(req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const company = await CompanyService.getAll(req.query);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const company = await CompanyService.getOne(req.params?.id);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const company = await CompanyService.update(req.params?.id, req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getClientRelation(req, res) {
    try {
      const company = await CompanyService.getClientRelation(req.query);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getWorkerRelation(req, res) {
    try {
      const company = await CompanyService.getWorkerRelation(req.query);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async workerRelationCreate(req, res) {
    try {
      const company = await CompanyService.workerRelationCreate(req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async clientRelationCreate(req, res) {
    try {
      const company = await CompanyService.clientRelationCreate(req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new CompanyController();
