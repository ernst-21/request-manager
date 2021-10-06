const express = require('express');
const agentCtrl = require('../controllers/agent.controller');

const router = express.Router();

router.route('/api/agent').post(agentCtrl.create);

module.exports = router;
