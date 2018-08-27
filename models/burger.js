// var orm = require("../config/orm.js");
// var burger = {
//     all: function (callback) {
//         // orm.all => (table, callback)
//         orm.all("burgers", callback);
//     },
//     create: function (cols, vals, callback) {
//         // orm.create => (table, cols, vals, callback)
//         orm.create("burgers", cols, vals, callback);
//     },
//     update: function (obj, condition, callback) {
//         // orm.update => (table, obj, condition, callback)
//         orm.update("burgers", obj, condition, callback);
//     },
//     delete: function (condition, callback) {
//         // orm.delete => (table, condition, callback)
//         orm.delete("burgers", condition, callback);
//     }
// }
// module.exports = burger;

module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            // AllowNull is a flag that restricts from being entered if it doesn't have a text value
            allowNull: false,
            // len is a validation that checks that our todo is between 1 and 140 characters
            validate: {
                len: [1, 140]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            // defaultValue is a flag that defaults to false if it isn't supplied one
            defaultValue: false
        }
    });
    return Burger;
};





