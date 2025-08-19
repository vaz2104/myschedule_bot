const CompanyService = require("../services/companyService");

class CompanyController {
  async create(req, res) {
    try {
      const company = await CompanyService.create(req.body);
      res.json(company);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllOrCompanyId(req, res) {
    try {
      const companies = await CompanyService.getAllOrCompanyId(
        req.query?.userId
      );
      res.json(companies);
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
}

module.exports = new CompanyController();
