var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String
    , email: {type: String, required: true, unique: true }
    , password: String  //******need to add more requirments to this later*****
    , created_at: {type: Date,  default:Date.now}
    // , addresses: [{street: String, city: String,}] //adding the array or objects makes this an embedded relationship
});

var User = mongoose.model('User', userSchema);

module.exports = User;
