const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller')

const router = express.Router();

router.route('/api/users').get(userCtrl.list).post(userCtrl.create);

router.param('userId', userCtrl.userByID);

router.route('/api/users/dragCard').put(userCtrl.dragTravelerCard)

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)

module.exports = router;
