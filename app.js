var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),  // added mongoose
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// REQUIRING ROUTES FROM THE EXPORTS
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
//setting up mongoose (connecting to mongoDB and creating the database)
// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
// mongoose.connect(url);
mongoose.connect("mongodb://David:206086290@ds161505.mlab.com:61505/yelp_camp");
mongoose.Promise = global.Promise;

// body parser allows to see the element value from the form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // does not need to include ejs extention
app.use(express.static(__dirname + "/public")); // uses the css stylesheet
app.use(methodOverride("_method"));

// seedDB(); // This creates 3 campgrounds with comments

// PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret: "Once again, Hello",
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); // used for flash messages. you will need express-session too

app.locals.moment = require('moment'); // used for the time passed

// AUTHENTICATION INITIALIZERS
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Add the user to every single template
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



// USE THE ROUTES COMING FROM THE OTHER FILES
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

// SERVER STARTS
app.listen(process.env.PORT , process.env.IP, function(){
    console.log("YelpCamp Has started!!!");
});





//name      url         verb    description
//============================================
//Index     /dogs       GET     Display a list of all dogs
//New       /dogs/new   GET     Displays form for a new dog
//Create    /dogs       POST    Add new dog to DB
//Show      /dogs/:id   GET     Shows input of one dog


//INDEX     /campgrounds    
//NEW       /campgrounds/new
//CREATE    /campgrounds
//SHOW      /campgrounds/:id

//NEW       /campgrounds/:id/comments/new   GET
//CREATE    /campgrounds/:id/comments       POST