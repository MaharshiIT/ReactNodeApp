const 

mongoose = require('mongoose'),
{ Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  photo: String
});

mongoose.model('users', userSchema);