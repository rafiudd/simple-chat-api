const bcrypt = require('bcryptjs');
const conn = require('../../helpers/database/connection').promise();
const wrapper = require('../../helpers/utils/wrapper');
const common = require('../../helpers/utils/common');

const createChat = async (req) => {
  const { userIdReceiver, users, message } = req;
  const roomId = common.generateRoomId();
  const date = new Date().toISOString();
  console.log(roomId,
    userIdReceiver,
    message,
    users.id,
    date,
    date)
  const [rows] = await conn.execute(
    'INSERT INTO `chats` (`room_id`, `user_id_receiver`, `message`, `created_by`, `created_at`, `updated_at`) VALUES(?,?,?,?,?,?)', 
    [
      roomId,
      userIdReceiver,
      message,
      users.id,
      date,
      date
    ]
  );
  
  if (rows.affectedRows === 1) {
    const resModel = {
      roomId: roomId,
      userIdReceiver: userIdReceiver,
      createdBy: users.id,
      message: message,
      createdAt: date,
      updatedAt: date
    }
    return wrapper.data(resModel, 'Success Create New Chat', 200);
  }
};

module.exports = {
  createChat
};
