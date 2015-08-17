var mongoose = require('mongoose');

//create a schema
var itemSchema = new mongoose.Schema({
  Title: {type: String, required: true}
  ,Description: String
  ,catagory: String
  ,created_at: Date
  ,updated_at: Date
  ,user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] //adding in the 'ref:' code turns this embedded into a forgein key.
    };
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
