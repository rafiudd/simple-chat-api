const bcrypt = require('bcryptjs');
const conn = require('../../helpers/database/connection').promise();
const wrapper = require('../../helpers/utils/wrapper');
const common = require('../../helpers/utils/common');

const createChat = async (req) => {
  const { userIdReceiver, users, message } = req;
  const roomId = common.generateRoomId();
  const date = new Date().toISOString();

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

const getAllChat = async (req) => {
  const { users, page, size } = req;
  const resData = [];
  const [rows] = await conn.execute(
    'SELECT * FROM `chats` WHERE `created_by`=? ORDER BY created_at = ASC',
    [users.id]
  );

  if (rows.length === 0) {
    return wrapper.data({}, 'Chat Not Found', 201);
  }

  let getLastMessage = rows[0].message;
  let getLastUpdate = rows[0].created_at;

  rows.map((value) => {
    const resModel = {
      roomId: value.room_id,
      userIdReceiver: value.user_id_receiver,
      createdBy: value.created_by,
      lastMessage: getLastMessage,
      lastUpdate: getLastUpdate
    };
    resData.push(resModel);
  });

  const metaData = {
    page: 1,
    size: 1,
    totalPages: 1,
    totalData: 1
  };

  return wrapper.paginationData(resData, metaData, 'Success Get All Chat', 200);
};

module.exports = {
  createChat,
  getAllChat
};
