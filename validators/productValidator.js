const joi = require("joi");

//* kita setting dulu schema product nya dengan joi

const createProductSchema = joi.object({
  title: joi.string().min(3).required(),
  price: joi.number().positive().required(),
  description: joi.string().required(),
  category: joi.string().required(),
  image: joi.string().allow(""),
});

module.exports = { createProductSchema };
