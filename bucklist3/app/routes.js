var User       = require('../app/models/user');
var userSchema = require('../app/models/user');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        console.log(req.user);
        res.render('index.ejs', { user : req.user }); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // add new item to the user profile
    app.get('/newitem', isLoggedIn, function(req, res) {
        // render new item page
        res.render('items/new', {user : req.user});

    });

    // process the newitem form
    app.post('/newitem', function(req, res){

        console.log('body:', req.body);

        User.findOne({_id: req.user._id}, function(err, user){
            if(err) return console.log(err);
            // create an item object
            var item = {};

            console.log( "user-ID: " + req.user._id);
            item.title          =req.body.bucket_item;
            item.entry          =req.body.entry;
            item.category       =req.body.category;
            console.log( "item: " +item);
            // push object into user-item schema
            user.items.push(item);
                // if (user.save()){ res.redirect("/profile"), err}
            // else { res.json({message: "Could not save item"});
            user.save(function (err, user) {
                if (err) return res.json({message: "Could not save item", error: err});
                res.redirect("/profile");
            });
        });
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
