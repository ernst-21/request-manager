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
    let users = await User.find().select('name email updated created pic'); // to define
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

exports.create = create;
exports.list = list;
exports.userByID = userByID;
exports.read = read;
exports.update = update;
