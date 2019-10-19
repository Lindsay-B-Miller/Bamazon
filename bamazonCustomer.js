var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Inspire1298*",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems();
    inquirerFunction()


    function displayItems() {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);

        });
    }

    function inquirerFunction() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What product would you like to buy? (Please select an item id) \n",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "units",
                message: "How many units would you like to purchase? \n",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (userItem) {
            console.log("Selecting item " + userItem.id);
            console.log("Number of uits: " + userItem.units);
            var query = connection.query(
                "SELECT * FROM products WHERE ?",
                {
                    item_id: userItem.id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    // if (userItem.units <= 
                }
            );
            console.log(query.sql);
            connection.end();

        });

    }
    // connection.end();
});