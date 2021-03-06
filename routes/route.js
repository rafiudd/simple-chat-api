const router = require('express').Router();
const apiHandlers = require('../modules/api_handler');

router.get('/', function (req, res) {
  res.json({
    status: 200,
    message: 'Service is successfull running :D'
  });
});

router.post('/users/register', apiHandlers.registerUser);
router.post('/users/login', apiHandlers.loginUser);
router.get('/users/all', apiHandlers.getAllUser);

router.post('/chats/new', apiHandlers.createChat);
router.get('/chats/me', apiHandlers.getAllChat);
router.get('/chats/me/:roomId', apiHandlers.getDetailChat);
router.post('/chats/reply', apiHandlers.replyChat);

module.exports = router;
