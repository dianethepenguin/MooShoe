var express 			  = require("express"),
	app 				  = express(),
	bodyParser			  = require("body-parser"),
	mongoose 			  = require("mongoose"),
	flash 				  = require("connect-flash"),
	passport 			  = require("passport"),
	Campground 			  = require("./models/campground"),
	Comment				  = require("./models/comment"),
	User 				  = require("./models/user"),
	seedDB 				  = require("./seeds"),
	LocalStrategy 		  = require("passport-local"),
	methodOverride		  = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose");

//requiring routes
var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 	 = require("./routes/index");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
// mongoose.connect(url);
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://dianethepenguin:Fishy234!@cluster0-kwaew.mongodb.net/yelp_camp?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Diane wins cutest penguin",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// app.listen(3000, function() { 
//   console.log('Server listening on port 3000'); 
// });
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The MooShoe Server Has Started!");
});
