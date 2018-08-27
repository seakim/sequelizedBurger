var express = require("express");
var app = express();

var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Set ÎHandlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our models for syncing
var db = require("./models");

// Routes
require("./controllers/burgers_controller.js")(app);
// // Import routes and give the server access to them.
// var routes = require("./controllers/burgers_controller.js");
// app.use(routes);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

var PORT = process.env.PORT || 3123;


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({
	force: true,
	logging: console.log
}).then(function () {
	db.Burger.bulkCreate([
		{burger_name: "Cheese Burger"},
		{burger_name: "Filet-O-Fish"},
		{burger_name: "Grilled Onion Cheddar", devoured: true},
		{burger_name: "ButterMilk Chicken-Crispy", devoured: true},
		{burger_name: "Quarter Pounder with Cheese"},
	]);
}).then(function() {
	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
	});
});
// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function () {
// 	// Log (server-side) when our server has started
// 	console.log("Server listening on: http://localhost:" + PORT);
// });

