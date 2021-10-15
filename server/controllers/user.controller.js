const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: 'Account successfully created! Please sign in' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find().select('_id name lastName range estimatedDate duration adults young children babies country budget negotiationStage negotiationDueDate negotiationStageAction');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: 'No users found'
    });
  }
};

const searchUser = async (req, res) => {
  const name = req.body.name;
  try {
    let users = await User.find(
      {$or: [{name: {$regex: name, $options: 'ig'}}, {lastName: {$regex: name, $options: 'ig'}}]}
    ).select('_id name lastName');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status('400').json({
        error: 'User not found'
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user'
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let user = req.profile;
    const { name, email, password, pic } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.hashed_password = user.encryptPassword(password);
    } else {
      user.hashed_password = user.hashed_password;
    }
    user.pic = pic;
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:
        'Something went wrong and your account could not be updated. Please input your data again.'
    });
  }
};

const dragTravelerCard = (req, res) => {
  let userId = req.body.id;
  User.findByIdAndUpdate(userId, {
    negotiationDueDate: req.body.negotiationDueDate,
    negotiationStage: req.body.negotiationStage,
    negotiationStageAction: req.body.negotiationStageAction
  }, { new: true }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.create = create;
exports.list = list;
exports.searchUser = searchUser;
exports.userByID = userByID;
exports.read = read;
exports.update = update;
exports.dragTravelerCard = dragTravelerCard;
