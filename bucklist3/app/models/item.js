var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

//create a schema
var itemSchema = mongoose.Schema({

    title             : {
        type          : String,
        required      : true,
    },
    description       : String,
    entry             : String,
    created_at        : {
        type          : Date,
        default       : Date.now,
    },
    updated_at        : {
        type          : Date,
        default       : Date.now,
    },
    user_id           : [{
        type          : mongoose.Schema.Types.ObjectId,
        ref           : 'User'
    }] //adding in the 'ref:' code turns this embedded into a forgein key.
});


module.exports = mongoose.model('Item', itemSchema);
