'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Images", deps: [Users, Blogs, Ideas]
 *
 **/

var info = {
    "revision": 9,
    "name": "add-image-table",
    "created": "2019-06-05T04:05:39.849Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Images",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "filename": {
                "type": Sequelize.STRING,
                "field": "filename"
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
            "BlogId": {
                "type": Sequelize.INTEGER,
                "field": "BlogId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Blogs",
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

var undoMigrationCommands = [
    {
        fn: "dropTable",
        params: [
            "Images"
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
