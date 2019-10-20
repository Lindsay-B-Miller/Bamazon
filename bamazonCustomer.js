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

    function displayItems() {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            // console.log("----------------------------------------------------------------------------------------------------------------")

            inquirerFunction()
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
                    console.log("Number of uits: " + userItem.units + "\n\n");
                    var query = connection.query(
                        "SELECT * FROM products WHERE ?",
                        {
                            item_id: userItem.id
                        },
                        function (err, res) {
                            if (err) throw err;
                            if (userItem.units <= res[0].stock_quantity) {
                                var query = connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: (res[0].stock_quantity - userItem.units),
                                            product_sales: (userItem.units * res[0].price)
                                        },
                                        {
                                            item_id: userItem.id
                                        }
                                    ],
                                    function (err, response) {
                                        if (err) throw err;
                                    },
                                    console.log("Purchase successful! Total cost: $" + (userItem.units * res[0].price))
                                );
                                // console.log(query.sql);
                                connection.end();
                            }
                            else {
                                console.log("Insufficient quantity! Please reduce the number of units in your order or select a different item.")
                                displayItems();
                                // inquirerFunction();
                            }
                        }
                    );

                });
            }
        });
    }
});