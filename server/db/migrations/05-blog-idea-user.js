'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Votes", deps: [Users, Ideas]
 * addColumn "UserId" to table "Blogs"
 * addColumn "UserId" to table "Ideas"
 *
 **/

var info = {
    "revision": 4,
    "name": "blogidea-user",
    "created": "2019-05-30T20:58:26.259Z",
    "comment": ""
};

var migrationCommands = [{
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
    },
    {
        fn: "addColumn",
        params: [
            "Blogs",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "UserId"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Blogs",
            "UserId"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Votes"
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
