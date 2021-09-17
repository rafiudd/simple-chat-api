const wrapper = require('../helpers/utils/wrapper');
const validator = require('../helpers/utils/validator');
const userDomain = require('./users/domain');
const userPayloadModel = require('./users/payload_model');
const chatDomain = require('./chats/domain');
const chatPayloadModel = require('./chats/payload_model');
const common = require('../helpers/utils/common');

/*eslint no-arrow-condition: "error"*/
const registerUser = async (req, res) => {
  const { body } = req;

  const payload = {
    ...body
  };

  const validatePayload = validator.isValidPayload(payload, userPayloadModel.registerValidate);

  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }

    return userDomain.registerUser(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
}

const loginUser = async (req, res) => {
  const { body } = req;

  const payload = {
    ...body
  };

  const validatePayload = validator.isValidPayload(payload, userPayloadModel.loginValidate);

  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }

    return userDomain.loginUser(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

const createChat = async (req, res) => {
  const { body, headers } = req;
  const users = common.getDataFromToken(headers.authorization);

  const payload = {
    ...body,
    ...headers,
    users
  };
  console.log(payload)

  const validatePayload = validator.isValidPayload(body, chatPayloadModel.createChatValidate);

  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }

    return chatDomain.createChat(payload);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  registerUser,
  loginUser,
  createChat
};