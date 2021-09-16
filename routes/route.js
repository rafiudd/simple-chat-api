const router = require('express').Router();
const apiHandlers = require('../modules/api_handler');

router.post('/users/register', apiHandlers.registerUser);

module.exports = router;
