'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "active" to table "Ideas"
 *
 **/

var info = {
    "revision": 8,
    "name": "add-idea-active",
    "created": "2019-06-01T06:17:07.217Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Ideas",
        "active",
        {
            "type": Sequelize.BOOLEAN,
            "field": "active",
            "defaultValue": true
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "active"
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
