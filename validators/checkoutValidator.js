const joi = require("joi");

const checkoutSchema = joi.object({
  amountPayment: joi.number.min(0).required(),
});

module.exports = checkoutSchema;
