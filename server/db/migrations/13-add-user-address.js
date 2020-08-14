'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Street_Name" to table "Users"
 * addColumn "Postal_Code" to table "Users"
 *
 **/

var info = {
    "revision": 13,
    "name": "add-user-address",
    "created": "2020-06-06T16:54:712Z",
    "comment": ""
};

var migrationCommands = [

    {
    fn: "addColumn",
    params: [
        "Users",
        "Street_Name",
        {
            "type": Sequelize.STRING,
            "field": "Street_Name",
        }
    ],
    
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "Postal_Code",
            {
                "type": Sequelize.STRING,
                "field": "Postal_Code"
            }
        ]
    }

];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Users",
            "Postal_Code"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Users",
            "Street_Name"
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
