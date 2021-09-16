const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('./wrapper');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if(!validate.isEmpty(error)){
    return wrapper.error('fail', error, 409);
  }
  return wrapper.data(value, 'success', 200);

};

module.exports = {
  isValidPayload
};
