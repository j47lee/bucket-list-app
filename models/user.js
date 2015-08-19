var mongoose    = require('mongoose'); //import package mongoose
var bcrypt      = require('bcrypt'); // import package bcrypt
var secret      = require('superPhrase');

var userSchema  = new mongoose.Schema({ //create a new user schema
    name:           String
    , email:        {type: String, required: true, unique: true} //require email, must be origin & unused email address
    , password:     {type: String, require: true, select: false}  //require password - make sure it won't be returned in normal user search
    , created_at:   {type: Date,  default:Date.now}
    // , addresses: [{street: String, city: String,}] //adding the array or objects makes this an embedded relationship
});

// encrypting user password method BEFORE saving to DB - only runs when user is new or updating the email address.
userSchema.pre('save', function(next){//run this function before 'this' gets saved to the db
    var user = this;

    // hash the pw only if the password has been changed or is new
    if(!user.isModified('password')) return next();

    //generate salty password
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            // change the password to the hashed version
            user.password = hash;
            next();
        });
    });
});

// add an authenticate method to the user schema
userSchema.methods.authenticate = function(password){
    var user = this;
    // console.log(this);
    return bcrypt.compareSync(password, user.password);
};

// create user model out of userSchema (constructor function)
var User = mongoose.model('User', userSchema);

// allow the user module to be open for export to any calling file
module.exports = User;
