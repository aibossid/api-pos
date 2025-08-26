const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must include upper, lower, number, and symbol",
    }),
  email: Joi.string().email().required(),
});

module.exports = registerSchema;
