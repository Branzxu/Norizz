const levelController = require('../controllers/level');
const router = require('express').Router();

router.post('/add', levelController.addLevel);

module.exports = router;