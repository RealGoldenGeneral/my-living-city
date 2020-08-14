'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "state" to table "Ideas"
 *
 **/

var info = {
    "revision": 7,
    "name": "add-idea-states",
    "created": "2019-06-01T05:22:32.213Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Ideas",
        "state",
        {
            "type": Sequelize.STRING,
            "field": "state",
            "defaultValue": "idea"
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "state"
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
