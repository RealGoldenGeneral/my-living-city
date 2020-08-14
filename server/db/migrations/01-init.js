'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Comments", deps: []
 * createTable "Blogs", deps: [Comments]
 * createTable "Ideas", deps: [Comments]
 * createTable "Users", deps: [Comments]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2019-05-24T06:48:58.799Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Comments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "text": {
                    "type": Sequelize.STRING(5000),
                    "field": "text"
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Blogs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "markdown": {
                    "type": Sequelize.STRING(5000),
                    "field": "markdown"
                },
                "active": {
                    "type": Sequelize.BOOLEAN,
                    "field": "active"
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
                "CommentId": {
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
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Ideas",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "description": {
                    "type": Sequelize.STRING(5000),
                    "field": "description"
                },
                "place_petal": {
                    "type": Sequelize.STRING,
                    "field": "place_petal"
                },
                "water_petal": {
                    "type": Sequelize.STRING,
                    "field": "water_petal"
                },
                "energy_petal": {
                    "type": Sequelize.STRING,
                    "field": "energy_petal"
                },
                "health_petal": {
                    "type": Sequelize.STRING,
                    "field": "health_petal"
                },
                "materials_petal": {
                    "type": Sequelize.STRING,
                    "field": "materials_petal"
                },
                "equity_petal": {
                    "type": Sequelize.STRING,
                    "field": "equity_petal"
                },
                "beauty_petal": {
                    "type": Sequelize.STRING,
                    "field": "beauty_petal"
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
                "CommentId": {
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
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "fname": {
                    "type": Sequelize.STRING,
                    "field": "fname"
                },
                "lname": {
                    "type": Sequelize.STRING,
                    "field": "lname"
                },
                "location": {
                    "type": Sequelize.STRING,
                    "field": "location"
                },
                "latitude": {
                    "type": Sequelize.DECIMAL,
                    "field": "latitude"
                },
                "longitude": {
                    "type": Sequelize.DECIMAL,
                    "field": "longitude"
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
                "CommentId": {
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
            },
            {}
        ]
    }
];

var undoMigrationCommands = [
    {
        fn: "dropTable",
        params: [
            "Users"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Ideas"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Blogs"
        ]
    },
    {
        fn: "dropTable",
        params: [
            "Comments"
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
