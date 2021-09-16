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

module.exports = router;
