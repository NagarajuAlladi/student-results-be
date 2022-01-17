import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  dept: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTeacher: {
    type: Boolean,
    default: false,
  },
});
