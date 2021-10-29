const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  stage: { type: String, trim: true },
  travelPartners: { type: String, trim: true },
  motive: {type: String},
  knowDate: { type: String, trim: true },
  range: [{ type: Date }],
  estimatedDate: [{ type: Date }],
  duration: {type: String},
  adults: { type: Number },
  young: { type: Number },
  children: { type: Number },
  babies: { type: Number },
  travelType: [{ type: String, trim: true }],
  accommodationType: [{ type: String, trim: true }],
  accompaniment: { type: String, trim: true },
  description: {type: String},
  budget: { type: Number },
  title: { type: String, trim: true },
  country: { type: String, trim: true },
  prefix: { type: String, trim: true },
  phone: { type: String, trim: true },
  birthday: { type: Date },
  terms: [{ type: String, trim: true }],
  rating: {type: Number},
  negotiationStage: {type: String},
  negotiationStageNote: {type: String},
  negotiationStageAction: {type: String},
  negotiationDueDate: {type: Date, default: Date.now},
  negotiationMemo: {type: String},
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index(
  {
    'name': "text",
    'lastName': "text"
  }
)

module.exports = mongoose.model('User', UserSchema);
