const Joi = require("joi");

const userKvitansiyaRegisterValidationSchema = Joi.object({
  fullname: Joi.string().trim().min(3).max(30).required(),
  phonenumber: Joi.string().trim().length(13).required(),
  sana: Joi.string().required(), // yoki .isoDate()
  summa: Joi.string().required(),
  tartibraqam: Joi.string(),
  qoshimchatolov: Joi.string().required(),
  amountpeople: Joi.string().required(),
  amountroom: Joi.string().required(),
  location:Joi.string().required(),

  isactive: Joi.boolean().required(),
});

const userKvitansiyaUpdateValidationSchema = Joi.object({
  fullname: Joi.string().trim().min(3).max(30),
  phonenumber: Joi.string().trim().length(13),
  sana: Joi.string(),
  summa: Joi.string(),
  tartibraqam: Joi.string(),
  qoshimchatolov: Joi.string(),
  amountpeople: Joi.string(),
  amountroom: Joi.string(),
  location:Joi.string(),

  isactive: Joi.boolean(),
});

module.exports = {
  userKvitansiyaRegisterValidationSchema,
  userKvitansiyaUpdateValidationSchema,
};
