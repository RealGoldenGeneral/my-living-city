'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "developerId" to table "Ideas"
 *
 **/

var info = {
    "revision": 11,
    "name": "add-developer",
    "created": "2019-06-12T21:55:17.738Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Ideas",
        "developerId",
        {
            "type": Sequelize.INTEGER,
            "field": "developerId",
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "Users",
                "key": "id"
            },
            "allowNull": true
        }
    ]
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "developerId"
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
