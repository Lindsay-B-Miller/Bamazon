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
    inquirerFunction();

    function inquirerFunction() {
        inquirer.prompt([
            {
                type: "list",
                name: "list",
                message: "Please select from the following options:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ]).then(function (userChoice) {
            if (userChoice.list === "View Products for Sale") {
                saleProducts();
            }
            if (userChoice.list === "View Low Inventory") {
                lowInventory();
            }
        })


    }

    function saleProducts() {
        var query = connection.query(
            "SELECT * FROM products",
            function (err, res) {
                if (err) throw err;
                console.table(res);
                connection.end();
            }
        )
    };

    function lowInventory() {
        var query = connection.query(
            "SELECT * FROM products WHERE stock_quantity < 5",
            function (err, res) {
                if (err) throw err;
                console.table(res);
                connection.end();
            }
        )
    }

});