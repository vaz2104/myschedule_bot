const SubscribersRelation = require("../models/SubscribersRelation");

class SubscriptionService {
  async create(options) {
    if (!options?.company_id || !options?.client_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newSubscription = await SubscribersRelation.create(options);
    return newSubscription;
  }

  async getCompanySubscribers(companyId) {
    if (!companyId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const subscribers = await SubscribersRelation.find({
      company_id: companyId,
    });

    return subscribers;
  }
}

module.exports = new SubscriptionService();
