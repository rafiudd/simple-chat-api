
const jwt = require('jsonwebtoken');
const wrapper = require('./wrapper');

const getDataFromToken = (authorization) => {
  if(
    !authorization ||
    !authorization.startsWith('Bearer') ||
    !authorization.split(' ')[1]
  ){
    return wrapper.data({}, 'Invalid Token', 201);
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'the-super-strong-secrect');
    return decoded;
  } catch (error) {
    return wrapper.data({}, 'Invalid Token', 201);    
  }
};

const generateRoomId = () => {
  return `ROOM-${new Date().getTime()}`;
}

module.exports = {
  getDataFromToken,
  generateRoomId
};
