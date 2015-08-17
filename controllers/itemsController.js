var Item = require('../models/Item');

// GET
function getIndex(req, res) {
  Item.find({}, {}, function(error, dbResponce) {
    if (error) {
      res.send('Something went wrong');
    }
    console.log('GET REQUEST FOR ALL');
    // by DEFAULT res.render looks inside folder names views
    res.render('./items/index', {
      title: "Item Index",
      items: dbResponce
    });
    // res.render('layout', {: candies});
  });
}

// GET
function newBoard(req, res) {
  console.log("FORM RENDERED FOR NEW DOCUMENT");
  res.render('./items/new', {
    title: "Create New Board"
  });
}

// POST
function create(req, res) {
  console.log('POST REQ RECVD');
  console.log('body:', req.body);
  var item = new Item();

  item.name = req.body.name;
  item.color = req.body.color;

  item.save(function(error) {
    if (error) {
      res.send('Could not ceate item b/c:' + error);
    }
    res.redirect('/items');
  });
}

// GET
function getOne(req, res) {
  var id = req.params.id;

  Item.findById(id, function(error, dbResponce) {
    if (error) {
      res.send('Could not find item b/c: ' + error);
    }
    console.log("GET REQUEST FOR ONE DOCUMENT");
    console.log(dbResponce);
    res.render('./items/show', {
      title: "Show Item",
      item: dbResponce
    });
  });
}

function edit(req, res) {
  var id = req.params.id;
  Item.findById(id, function(err, dbResponce) {
    res.render('./items/edit', {
      item: dbResponce
    });
  });
}

function update(req, res) {
  var id = req.params.id;

  Item.findById(id, function(error, dbResponce) {
    if (error) {
      res.send('Could not find item b/c:' + error);
    }
    console.log('PUT REQUEST RECEIVED');
    console.log(dbResponce);
    dbResponce.name = req.body.name;
    dbResponce.color = req.body.color;
    dbResponce.save(function(error) {
      if (error) {
        res.send('Could not update item b/c:' + error);
      }
      res.redirect('/items');
    });
  });
}

function destroy(req, res) {
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
  new: newBoard,
  create: create,
  getOne: getOne,
  edit: edit,
  update: update,
  destroy: destroy
};
