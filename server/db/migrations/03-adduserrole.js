'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "role" to table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "adduserrole",
    "created": "2019-05-27T02:13:09.066Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Users",
        "role",
        {
            "type": Sequelize.STRING,
            "field": "role",
            "defaultValue": "user"
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Users",
            "role"
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
