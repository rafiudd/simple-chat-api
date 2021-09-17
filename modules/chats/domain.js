const conn = require('../../helpers/database/connection').promise();
const wrapper = require('../../helpers/utils/wrapper');
const common = require('../../helpers/utils/common');

const createChat = async (req) => {
  const { userIdReceiver, users, message } = req;
  const roomId = common.generateRoomId();
  const messageId = common.generateMessageId();
  const date = new Date().toISOString();

  const [validateRooms] = await conn.execute(
    'SELECT * FROM `rooms` WHERE `created_by` = ? AND `user_id_receiver` = ?',
    [users.id, userIdReceiver]
  );
  
  // jika pengirim sudah pernah mengirim pesan ke penerima
  if (validateRooms.length > 0) {
    return wrapper.error(true, 'Cannot create new chat, You already in room. Please use API Reply Chat', 500);
  }

  const [createRooms] = await conn.execute(
    'INSERT INTO `rooms` (`room_id`, `user_id_receiver`, `created_by`, `created_at`) VALUES(?,?,?,?)', 
    [
      roomId,
      userIdReceiver,
      users.id,
      date
    ]
  );

  const [createFirstMessage] = await conn.execute(
    'INSERT INTO `messages` (`room_id`, `message_id`, `message`, `created_at`, `created_by`, `is_read`) VALUES(?,?,?,?,?,?)', 
    [
      roomId,
      messageId,
      message,
      date,
      users.id,
      'false'
    ]
  );

  if(createRooms.affectedRows !== 1 && createFirstMessage.affectedRows !== 1) {
    return wrapper.error(true, 'Internal Server Error', 500);
  }
  
  if (createRooms.affectedRows === 1 && createFirstMessage.affectedRows === 1) {
    const resModel = {
      roomId: roomId,
      userIdReceiver: userIdReceiver,
      createdBy: users.id,
      message: message,
      messageId,
      createdAt: date,
      updatedAt: date
    };

    return wrapper.data(resModel, 'Success Create New Chat', 200);
  }
};

const getAllChat = async (req) => {
  const { users } = req;
  const resData = [];
  const [rows] = await conn.execute(
    'SELECT rooms.user_id_receiver, rooms.created_by, rooms.room_id, rooms.created_at, rooms.updated_at, users.username FROM rooms INNER JOIN users ON rooms.user_id_receiver = users.id WHERE rooms.created_by = ? ORDER BY rooms.updated_at DESC',
    [users.id]
  );

  if (rows.length === 0) {
    return wrapper.data({}, 'Chat Not Found', 201);
  }

  await Promise.all(
    rows.map(async (value) => {
      const [getLastMessage] = await conn.execute(
        'SELECT message FROM messages WHERE room_id = ? ORDER BY created_at DESC',
        [value.room_id]
      );

      const [countUnread] = await conn.execute(
        'SELECT COUNT(is_read) as countUnread FROM messages WHERE room_id = ? AND is_read = ?',
        [value.room_id, 'false']
      )

      const resModel = {
        roomId: value.room_id,
        userIdReceiver: value.user_id_receiver,
        userNameReceiver: value.username,
        createdBy: value.created_by,
        lastMessage: getLastMessage[0] ? getLastMessage[0].message : "",
        countUnread: countUnread[0].countUnread,
        lastUpdate: value.updated_at
      };
      resData.push(resModel);
    })
  );

  return wrapper.data(resData, 'Success Get All Chat', 200);
};

const replyChat = async (req) => {
  const { users, roomId, message } = req;
  const messageId = common.generateMessageId();
  const date = new Date().toISOString();
  
  const [validateRooms] = await conn.execute(
    'SELECT * FROM `rooms` WHERE `room_id` = ? AND (user_id_receiver = ? OR created_by = ?)',
    [roomId, users.id, users.id]
  );

  if (validateRooms.length < 1) {
    return wrapper.error(true, 'Cannot reply chat, Not allowed to access this Room Id', 500);
  }

  const [createMessage] = await conn.execute(
    'INSERT INTO `messages` (`room_id`, `message_id`, `message`, `created_at`, `created_by`) VALUES(?,?,?,?,?)', 
    [
      roomId,
      messageId,
      message,
      date,
      users.id
    ]
  );

  const [updateLastUpdated] = await conn.execute(
    'UPDATE `rooms` SET updated_at = ? WHERE room_id = ?',
    [date, roomId]
  );

  if(createMessage.affectedRows !== 1 && updateLastUpdated.affectedRows !== 1) {
    return wrapper.error(true, 'Internal Server Error', 500);
  }

  if(createMessage.affectedRows === 1 && updateLastUpdated.affectedRows === 1) {
    const resModel = {
      roomId: roomId,
      message: message,
      messageId: messageId,
      createdBy: users.id,
      createdAt: date
    }
    return wrapper.data(resModel, 'Success Reply Chat', 200);
  }
};

const getDetailChat = async (req) => {
  const { roomId } = req;
  const resData = [];
  const [rows] = await conn.execute(
    'SELECT * FROM messages WHERE room_id = ? ORDER BY created_at DESC',
    [roomId]
  );

  // jika membuka get detail update semua is_read di room_id yang sama ke true
  await conn.execute(
    'UPDATE `messages` SET is_read = ? WHERE room_id = ?',
    ['true', roomId]
  );

  if (rows.length < 1) {
    return wrapper.data({}, 'Chat Not Found', 201);
  }

  rows.map((value) => {
    const resModel = {
      roomId: value.room_id,
      message: value.message,
      messageId: value.message_id,
      createdBy: value.created_by,
      createdAt: value.created_at
    };
    resData.push(resModel);
  });

  return wrapper.data(resData, 'Success Get Detail Chat', 200);
};

module.exports = {
  createChat,
  getAllChat,
  replyChat,
  getDetailChat
};
