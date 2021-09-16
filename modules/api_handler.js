const wrapper = require('../helpers/utils/wrapper');
const userDomain = require('./users/domain');

/*eslint no-arrow-condition: "error"*/
const registerUser = async (req, res) => {
  const { user, headers, query } = req;
  const payload =
    {
      ...user,
      ...headers,
      url : req.href(),
      query
    };
  const getData = async () => userDomain.registerUser(payload);
  const sendResponse = async (result, data) => {
    (result.err) ? wrapper.paginationResponse(res, 'fail', result)
      : wrapper.paginationResponse(res, 'success', result, result.message, data);
  };
  sendResponse(await getData());
};
  
module.exports = {
  registerUser
}