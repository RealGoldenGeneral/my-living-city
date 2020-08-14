'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "CommentId" from table "Blogs"
 * removeColumn "CommentId" from table "Ideas"
 * removeColumn "CommentId" from table "Users"
 * addColumn "IdeaId" to table "Comments"
 * addColumn "BlogId" to table "Comments"
 * addColumn "UserId" to table "Comments"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2019-05-25T06:38:33.091Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Blogs", "CommentId"]
    },
    {
        fn: "removeColumn",
        params: ["Ideas", "CommentId"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "CommentId"]
    },
    {
        fn: "addColumn",
        params: [
            "Comments",
            "IdeaId",
            {
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
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Comments",
            "BlogId",
            {
                "type": Sequelize.INTEGER,
                "field": "BlogId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Blogs",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Comments",
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
            "Comments",
            "UserId"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Comments",
            "BlogId"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Comments",
            "IdeaId"
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "CommentId",
            {
                "type": Sequelize.INTEGER,
                "field": "CommentId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Comments",
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
            "CommentId",
            {
                "type": Sequelize.INTEGER,
                "field": "CommentId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Comments",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Blogs",
            "CommentId",
            {
                "type": Sequelize.INTEGER,
                "field": "CommentId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Comments",
                    "key": "id"
                },
                "allowNull": true
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
