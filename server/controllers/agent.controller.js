const Agent = require('../models/agent.model');
const errorHandler = require('../helpers/dbErrorHandler');

const create = async (req, res, next) => {
  const agent = new Agent(req.body);
  try {
    await agent.save();
    return res.status(200).json({ message: 'Account successfully created! Please sign in' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

exports.create = create;
