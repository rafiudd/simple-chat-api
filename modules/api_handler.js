const wrapper = require('../helpers/utils/wrapper');
const validator = require('../helpers/utils/validator');
const userDomain = require('./users/domain');
const payloadModel = require('./users/payload_model');

/*eslint no-arrow-condition: "error"*/
const registerUser = async (req, res) => {
  const { body } = req;

  const payload = {
    ...body
  };

  const validatePayload = validator.isValidPayload(payload, payloadModel.registerValidate);

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

  const validatePayload = validator.isValidPayload(payload, payloadModel.loginValidate);

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
}

module.exports = {
  registerUser,
  loginUser
};