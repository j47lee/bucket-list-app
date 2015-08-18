var Item = require('../models/item');

// GET
function getIndex(req, res) {
  Item.find({}, {}, function(error, dbResponse) {
    if (error) {
      res.send('Something went wrong w getting Items');
    }
    console.log('GET REQUEST FOR ALL');
    // by DEFAULT res.render looks inside folder names views

    //UNCOMMENT WHEN VIEWS ARE READY
    // res.render('./items', {
    //   title: "Item Index",
    //   items: dbResponse
    // });

    res.json(dbResponse)//json test, replace with views when ready
    
  });
}

// GET
function newItem(req, res) {
  console.log("FORM RENDERED FOR NEW DOCUMENT");
  res.render('./items/new', {
    title: "Create New Board"
  });
}

// POST
function createItem(req, res) {
  console.log('POST REQ RECVD');
  console.log('body:', req.body);
  var item = new Item();

  item.title = req.body.title; //pull from the body the title
  item.description = req.body.description; //pull from body the description
  item.catagory = req.body.catagory; //pull for the body the catagory

  item.save(function(error) {
    if (error) {
      res.send('Could not ceate item due to:' + error);
    }
    res.redirect('/items');
  });
}

// GET
function getOneItem(req, res) {
  var id = req.params.id;

  Item.findById(id, function(error, dbResponse) {
    if (error) {
      res.send('Could not find item b/c: ' + error);
    }
    console.log("GET REQUEST FOR ONE DOCUMENT");
    console.log(dbResponse);
    res.render('./items/:id', {//**** need to review this route for errors.
      title: "Show Item",
      item: dbResponse
    });
  });
}

function editItem(req, res) {
  var id = req.params.id;
  Item.findById(id, function(err, dbResponse) {
    res.render('./items/:id/edit', { //**** need to review this route for errors.
      item: dbResponse
    });
  });
}

function updateItem(req, res) {
  var id = req.params.id;

  Item.findById(id, function(error, dbResponse) {
    if (error) {
      res.send('Could not find item b/c:' + error);
    }
    console.log('PUT REQUEST RECEIVED');
    console.log(dbResponse);
    dbResponse.title = req.body.title; //pull from the body the title
    dbResponse.description = req.body.description; //pull from body the description
    dbResponse.catagory = req.body.catagory; //pull for the body the catagory
    dbResponse.save(function(error) {
      if (error) {
        res.send('Could not update item b/c:' + error);
      }
      res.redirect('/items');
    });
  });
}

function destroyItem(req, res) {
  var id = req.params.id;
  console.log('DELETE REQUEST RECEIVED');
  Item.remove({
    _id: id
  }, function(error) {
    if (error) {
      res.send('Could not delete item due to: ' + error);
    }
    res.redirect('/items');
  });
}

module.exports = {
  getIndex: getIndex,
  new: newItem,
  create: createItem,
  getOne: getOneItem,
  edit: editItem,
  update: updateItem,
  destroy: destroyItem
};
