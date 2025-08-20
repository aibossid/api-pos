const joi = require("joi");

const addToCartSchema = joi.object({
  //* artinya joi akan memvalidasi tipe number, dan required adalah mandatory
  id: joi.number().required(),
  //* untuk qty, joi juga akan meminta number, dan harus positive tidak bs minus, dan mandatory
  qty: joi.number().positive().required(),
});

const updateQtySchema = joi.object({
  qty: joi.number().min(0).integer().required(),
});

module.exports = {
  addToCartSchema,
  updateQtySchema,
};
