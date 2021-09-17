const joi = require('joi');

const createChatValidate = joi.object({
  userIdReceiver: joi.number().required().min(1).max(10),
  message: joi.string().required().min(1).max(500)
});

const replyChatValidate = joi.object({
  roomId: joi.string().required().min(1).max(20),
  message: joi.string().required().min(1).max(500)
});

module.exports = {
  createChatValidate,
  replyChatValidate
};
