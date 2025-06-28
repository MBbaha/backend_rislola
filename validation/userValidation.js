const Joi = require("joi");

const userRegisterValidationSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30).required(),
  lastname: Joi.string().trim().min(3).max(30).required(),
  phonenumber: Joi.string().trim().length(9).required(),
  sana: Joi.string().required(), // yoki .isoDate()
  summa: Joi.string().required(),
  location:Joi.string().required(),
  baho:Joi.string().required(),
  isactive: Joi.boolean().required(),
});

const userUpdateValidationSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30),
  lastname: Joi.string().trim().min(3).max(30),
  phonenumber: Joi.string().trim().length(9),
  sana: Joi.string(),
  summa: Joi.string(),
  location:Joi.string(),
  baho:Joi.string(),
  isactive: Joi.boolean(),
});

module.exports = {
  userRegisterValidationSchema,
  userUpdateValidationSchema,
};
