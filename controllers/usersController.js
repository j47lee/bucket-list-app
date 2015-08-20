var User = require('../models/User');
var app = require('../app.js');


// GET
function getIndex(req, res) {
  User.find({}, {}, function(error, dbResponse) {
    if (error) {
      res.send('Failed to request user');
    }
    console.log('GET REQUEST FOR ALL');

    //UNCOMMENT WHEN VIEWS ARE READY
    // res.render('./users/index', {
    //   title: "User Index",
    //   users: dbResponse
    // });

    res.render('users/index'); //json test, replace with views when ready
  });
}

// GET
function newUser(req, res) {
  console.log("FORM RENDERED FOR NEW DOCUMENT");
  res.render('users/new', {
    title: "Create New User"
  });
}

// POST
function create(req, res) {
  console.log('POST REQ RECVD');
  console.log('body:', req.body);
  var user = new User();

  user.name = req.body.name;
  user.color = req.body.color;

  user.save(function(error) {
    if (error) {
      res.send('Could not ceate user b/c:' + error);
    }
    res.redirect('/users');
  });
}

// GET
function getOne(req, res) {
  var id = req.params.id;

  User.findById(id, function(error, dbResponse) {
    if (error) {
      res.send('Could not find user b/c: ' + error);
    }
    console.log("GET REQUEST FOR ONE DOCUMENT");
    console.log(dbResponse);
    res.render('users/show', {
      title: "Show User",
      user: dbResponse
    });
    res.json(dbResponse);
  });
}

function edit(req, res) {
  var id = req.params.id;
  User.findById(id, function(err, dbResponse) {
    res.render('/users/edit', {
      user: dbResponse
    });
  });
}

function update(req, res) {
  var id = req.params.id;

  User.findById(id, function(error, dbResponse) {
    if (error) {
      res.send('Could not find user b/c:' + error);
    }
    console.log('PUT REQUEST RECEIVED');
    console.log(dbResponse);
    dbResponse.name = req.body.name;
    dbResponse.color = req.body.color;
    dbResponse.save(function(error) {
      if (error) {
        res.send('Could not update user b/c:' + error);
      }
      res.redirect('/users');
    });
  });
}

// DELETE
function destroy(req, res) {
  var id = req.params.id;
  console.log('DELETE REQUEST RECEIVED');
  User.remove({
    _id: id
  }, function(error) {
    if (error) {
      res.send('Could not delete user due to: ' + error);
    }
    res.redirect('/users');
  });
}

module.exports = {
  getIndex: getIndex,
  new: newUser,
  create: create,
  getOne: getOne,
  edit: edit,
  update: update,
  destroy: destroy
};
