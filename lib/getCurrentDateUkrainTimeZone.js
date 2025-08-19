const moment = require("moment-timezone");
const dateUkrainTZ = moment.tz(Date.now(), "Europe/Kyiv");

module.exports = dateUkrainTZ;
