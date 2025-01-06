const SubscriptionService = require("../services/subscriptionService");

class SubscriptionController {
  async create(req, res) {
    try {
      const newSubscription = await SubscriptionService.create(req.body);
      res.json(newSubscription);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getCompanySubscribers(req, res) {
    try {
      const companySubscribers =
        await SubscriptionService.getCompanySubscribers(req.params?.id);
      res.json(companySubscribers);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new SubscriptionController();
