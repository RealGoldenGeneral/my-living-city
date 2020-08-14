'use strict';

var Sequelize = require('sequelize');
const { DataTypes } = require('sequelize/lib/sequelize');
const { STRING } = require('sequelize');

var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "Roles",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "role_name": {
                    "type": Sequelize.STRING,
                    "field": "role_name"
                },
                "createdAt": DataTypes.DATE,
                "updatedAt": DataTypes.DATE
            }
        ]
    },
    {
        fn: "removeColumn",
        params: ["Users", "role"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "RoleId",
            {
                "type": Sequelize.INTEGER,
                "field": "RoleId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Roles",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Users",
            "RoleId"
        ]
    },
    {
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
    },
    {
        fn: "dropTable",
        params: [
            "Roles"
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
    }
};