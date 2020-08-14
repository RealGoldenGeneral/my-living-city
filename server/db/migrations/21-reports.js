'use strict';

var Sequelize = require('sequelize');
const { DataTypes } = require('sequelize/lib/sequelize');
const { STRING } = require('sequelize');

var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "Reports",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "eamil": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "reason": {
                    "type": Sequelize.STRING,
                    "field": "reason"
                },
                "createdAt": DataTypes.DATE,
                "updatedAt": DataTypes.DATE
            }
        ]
    }
];

var undoMigrationCommands = [
    {
        fn: "dropTable",
        params: [
            "Reports"
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