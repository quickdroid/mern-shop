import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  }
});

UserSchema.methods.passwordIsValid = function (password, callback) {
  const results = !this.password || !password
    ? false
    : this.password == password;
  callback(null, results);
};

export {UserSchema as UserSchema};
