const bcrypt = require('bcryptjs');
const conn = require('../../helpers/database/connection').promise();
const wrapper = require('../../helpers/utils/wrapper');
const jwt = require('jsonwebtoken');
const config = require('../../configs/global_config');

const registerUser = async (req) => {
  const [row] = await conn.execute(
    "SELECT `email` FROM `users` WHERE `email`=?",
    [req.email]
  );

  if (row.length > 0) {
    return wrapper.data({}, 'Email already used', 201);
  }

  const hashPass = await bcrypt.hash(req.password, 12);
  const date = new Date().toISOString();
  const [rows] = await conn.execute('INSERT INTO `users`(`username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES(?,?,?,?,?)', [
    req.username,
    req.email,
    hashPass,
    date,
    date
  ]);
  
  if (rows.affectedRows === 1) {
    const resModel = {
      username: req.username,
      email: req.email,
      password: hashPass,
      createdAt: date,
      updatedAt: date
    }
    return wrapper.data(resModel, 'Success Register User', 200);
  }
};

const loginUser = async (req) => {
  const [row] = await conn.execute(
    "SELECT * FROM `users` WHERE `email`=?",
    [req.email]
  );

  if (row.length === 0) {
    return wrapper.data({}, 'Email Not Found', 201);
  }

  const passMatch = await bcrypt.compare(req.password, row[0].password);
  if (!passMatch) {
    return wrapper.error({}, 'Incorrect Password', 401);
  }

  const generateToken = jwt.sign({ id: row[0].id }, config.get('/jwtKey'), { expiresIn: '1h' });
  const resModel = {
    email: req.email,
    token: generateToken
  };

  return wrapper.data(resModel, 'Success Login User', 200);
};
  
module.exports = {
  registerUser,
  loginUser
}