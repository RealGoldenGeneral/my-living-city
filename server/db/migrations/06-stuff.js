'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "short_desc" to table "Blogs"
 * addColumn "slug" to table "Blogs"
 * changeColumn "active" on table "Blogs"
 * changeColumn "active" on table "Comments"
 *
 **/

var info = {
    "revision": 6,
    "name": "stuff",
    "created": "2019-06-01T02:51:16.880Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Blogs",
            "short_desc",
            {
                "type": Sequelize.STRING(500),
                "field": "short_desc"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Blogs",
            "slug",
            {
                "type": Sequelize.STRING,
                "field": "slug"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Blogs",
            "active",
            {
                "type": Sequelize.BOOLEAN,
                "field": "active",
                "defaultValue": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Comments",
            "active",
            {
                "type": Sequelize.BOOLEAN,
                "field": "active",
                "defaultValue": true
            }
        ]
    }
];

var undoMigrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "Comments",
            "active",
            {
                "type": Sequelize.BOOLEAN,
                "field": "active"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Blogs",
            "active",
            {
                "type": Sequelize.BOOLEAN,
                "field": "active"
            }
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Blogs",
            "slug"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Blogs",
            "short_desc"
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
