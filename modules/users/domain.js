const bcrypt = require('bcryptjs');
const conn = require('../../helpers/database/connection').promise();
const wrapper = require('../../helpers/utils/wrapper');
const {validationResult} = require('express-validator');

const registerUser = async (req) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
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
    return wrapper.data(resModel, 'Success Register Users', 200);
  }
};
  
module.exports = {
  registerUser
}