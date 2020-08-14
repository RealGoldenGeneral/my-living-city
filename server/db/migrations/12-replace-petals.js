'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "place_petal" from Table "Ideas"
 * removeColumn "water_petal" from Table "Ideas"
 * removeColumn "energy_petal" from Table "Ideas"
 * removeColumn "health_petal" from Table "Ideas"
 * removeColumn "materials_petal" from Table "Ideas"
 * removeColumn "equity_petal" from Table "Ideas"
 * removeColumn "beauty_petal" from Table "Ideas"
 * addColumn "community_impact" to Table "Ideas"
 * addColumn "nature_impact" to Table "Ideas"
 * addColumn "arts_impact" to Table "Ideas"
 * addColumn "energy_impact" to Table "Ideas"
 * addColumn "manufacturing_impact" to Table "Ideas"
 *
 **/

var info = {
    "revision": 12,
    "name": "replace-petals",
    "created": "2020-06-05T20:53:12Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "place_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "water_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "energy_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "health_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "materials_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "equity_petal"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "beauty_petal"
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "community_impact",
            {
                "type": Sequelize.STRING,
                "field": "community_impact"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "nature_impact",
            {
                "type": Sequelize.STRING,
                "field": "nature_impact"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "arts_impact",
            {
                "type": Sequelize.STRING,
                "field": "arts_impact"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "energy_impact",
            {
                "type": Sequelize.STRING,
                "field": "energy_impact"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "manufacturing_impact",
            {
                "type": Sequelize.STRING,
                "field": "manufacturing_impact"
            }
        ]
    },
];

var undoMigrationCommands = [
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "community_impact"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "nature_impact"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "arts_impact"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "energy_impact"
        ]
    },
    {
        fn: "removeColumn",
        params: [
            "Ideas",
            "manufacturing_impact"
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "place_petal",
            {
                "type": Sequelize.STRING,
                "field": "place_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "water_petal",
            {
                "type": Sequelize.STRING,
                "field": "water_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "energy_petal",
            {
                "type": Sequelize.STRING,
                "field": "energy_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "health_petal",
            {
                "type": Sequelize.STRING,
                "field": "health_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "materials_petal",
            {
                "type": Sequelize.STRING,
                "field": "materials_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "equity_petal",
            {
                "type": Sequelize.STRING,
                "field": "equity_petal"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ideas",
            "beauty_petal",
            {
                "type": Sequelize.STRING,
                "field": "beauty_petal"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize) {
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
    down: function(queryInterface, Sequelize) {
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
