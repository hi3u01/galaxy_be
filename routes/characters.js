const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/stats', characterController.getCharacters);

module.exports = router;