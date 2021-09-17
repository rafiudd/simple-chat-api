
const jwt = require('jsonwebtoken');
const config = require('../../configs/global_config');

const getDataFromToken = (req, res, authorization) => {
  if(
    !authorization ||
    !authorization.startsWith('Bearer') ||
    !authorization.split(' ')[1]
  ){
    res.json({
      status: 401,
      message: 'Invalid Token'
    });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.get('/jwtKey'));
    return decoded;
  } catch (error) {
    res.json({
      status: 401,
      message: 'Invalid Token'
    });
  }
};

const generateRoomId = () => {
  return `ROOM-${new Date().getTime()}`;
};

const generateMessageId = () => {
  return `MSG-${new Date().getTime()}`;
};

module.exports = {
  getDataFromToken,
  generateRoomId,
  generateMessageId
};
