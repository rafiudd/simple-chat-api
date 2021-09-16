const joi = require('joi');

const registerValidate = joi.object({
  username: joi.string().required().min(4).max(30),
  email: joi.string().required().max(30),
  password: joi.string().required().min(5)
});

const loginValidate = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
});

module.exports = {
  registerValidate,
  loginValidate
};
