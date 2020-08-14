'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "category" to table "Ideas"
 *
 **/

var info = {
    "revision": 14,
    "name": "add-category-ideas",
    "created": "2020-06-08T05:21:57.778Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Ideas",
        "category",
        {
            "type": Sequelize.STRING,
            "field": "category",
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "category"
        ]
    },
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    down: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < undoMigrationCommands.length)
                {
                    let command = undoMigrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
