'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "markdown" on table "Blogs"
 *
 **/

var info = {
    "revision": 10,
    "name": "increase-blog-char-limit",
    "created": "2019-06-10T00:12:43.322Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "Ideas",
        "ratio",
        {
            "type": Sequelize.INTEGER,
            "field": "ratio",
            "defaultValue": 7
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "Blogs",
            "markdown",
            {
                "type": Sequelize.FLOAT,
                "field": "ratio",
                "defaultValue": (2/3)
            }
        ]
    }
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
