'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "CommentId" to table "Votes"
 *
 **/

var info = {
    "revision": 15,
    "name": "add-comment-id",
    "created": "2020-06-10T00:16:52Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Votes",
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
}];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Votes",
            "CommentId"
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