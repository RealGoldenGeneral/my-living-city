'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable: Votes Table
 *
 **/

var info = {
    "revision": 20,
    "name": "removeVotes",
    "created": "2020-06-16T16:11:30Z",
    "comment": ""
};


var migrationCommands = [
    {
        fn: "dropTable",
        params: [
            "Vote"
        ]
    },
];

var undoMigrationCommands = [{
    fn: "createTable",
    params: [
        "Votes",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "up": {
                "type": Sequelize.BOOLEAN,
                "field": "up"
            },
            "down": {
                "type": Sequelize.BOOLEAN,
                "field": "down"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            },
            "IdeaId": {
                "type": Sequelize.INTEGER,
                "field": "IdeaId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Ideas",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
}];

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
    }
};
