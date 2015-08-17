var mongoose = require('mongoose');

//create a schema
var itemSchema = new mongoose.Schema({
  title: {type: String, required: true}
  ,description: String
  ,catagory: String
  ,created_at: {type: Date,  default:Date.now}
  ,updated_at: {type: Date,  default:Date.now}
  ,user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] //adding in the 'ref:' code turns this embedded into a forgein key.
    };
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
