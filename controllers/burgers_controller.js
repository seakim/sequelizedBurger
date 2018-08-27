// var express = require("express");
// var router = express.Router();
// var burger = require("../models/burger.js");

// router.get("/", function(req, res) {
//     // burger.all => (callback)
//     burger.all(function (data) {
//         var hasObject = {
//             burgers: data
//         }
//         res.render("index", hasObject);
//     })
// });
// router.get("/api/burgers", function(req, res) {

//     // burger.all => (callback)
//     burger.all(function (data) {
//         var hasObject = {
//             burgers: data
//         }
//         return res.json(hasObject);
//     })
// });

// router.post("/api/burgers", function(req, res) {
//     // console.log(req.body);

//     // burger.create => (cols, vals, callback)
//     burger.create(
//         ["burger_name", "devoured"]
//         , [req.body.burger_name, 0]
//         , function(result) {
//             // Send back the ID of the new quote
//             res.json({ id: result.insertId });
//     });
// });

// router.put("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
//     // console.log("condition:", condition);
//     // burger.update => (obj, condition, callback) 
//     burger.update(
//         { devoured: req.body.devoured }
//         , condition
//         , function(result) {
//             if (result.changedRows === 0) {
//                 // If no rows were changed, then the ID must not exist, so 404
//                 return res.status(404).end();
//             } else {
//                 res.status(200).end();
//             }
//         }
//     );
// });

// router.delete("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     // burger.update => (condition, callback) 
//     burger.delete(
//         condition
//         , function() {
//             res.status(200).end();
//         }
//     )
// })

// module.exports = router;



var db = require("../models");
module.exports = function (app) {

    app.get("/", function(req, res) {
        db.Burger.findAll({}).then(function(dbBurger) {
            var hasObject = {
                burgers: dbBurger
            }
            res.render("index", hasObject);
        });
    });

    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({}).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });

    // POST route for saving a new burger
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function (dbBurger) {
            res.json(dbBurger);
        });
    });

    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update(
            req.body,
            {
                where: {id: req.params.id}
            }
        ).then(function (dbBurger) {
            res.json(dbBurger);
        })
    })

    app.delete("/api/burgers/:id", function (req, res) {
        db.Burger.destroy({
            where: {id: req.params.id}
        }).then( function(dbBurger) {
            res.json(dbBurger);
        })
    })
};
