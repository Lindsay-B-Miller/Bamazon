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
            else if (userChoice.list === "View Low Inventory") {
                lowInventory();
            }
            else if (userChoice.list === "Add to Inventory") {
                addToInventory();
            }
            else if (userChoice.list === "Add New Product") {
                addProduct();
            }
        })
    };

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
    };

    function addToInventory() {
        var query = connection.query(
            "SELECT * FROM products",
            function (err, res) {
                if (err) throw err;
                console.table(res);

                inquirer.prompt([
                    {
                        type: "input",
                        name: "addInventory",
                        message: "For which product would you like to add more units? (Please enter an item id number",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    },
                    {
                        type: "input",
                        name: "addNumUnits",
                        message: "How many units would you like to add?",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }
                ]).then(function (addUser) {
                    console.log(addUser.addInventory);
                    console.log(addUser.addNumUnits);
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (parseInt(addUser.addNumUnits) + parseInt(res[(addUser.addInventory - 1)].stock_quantity))
                            },
                            {
                                item_id: addUser.addInventory
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            connection.end();
                        }
                    )
                })
                // connection.end();
            }
        )
    };

    function addProduct() {
        inquirer.prompt([
            {
                type: "input",
                name: "productName",
                message: "What product would you like to add?"
            },
            {
                type: "input",
                name: "departmentName",
                message: "What department houses this item?"
            },
            {
                type: "input",
                name: "price",
                message: "What is the price of this item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of these items would you like to stock?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (userNewItem) {
            // console.log(userNewItem.productName)
            // console.log(userNewItem.departmentName)
            // console.log(userNewItem.price)
            // console.log(userNewItem.quantity)
            console.log("Inserting new item... \n")
            var query = connection.query(
                "INSERT INTO products SET?",
                {
                    product_name: userNewItem.productName,
                    department_name: userNewItem.departmentName,
                    price: userNewItem.price,
                    stock_quantity: userNewItem.quantity
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " item inserted!\n")
                }

            );
            connection.end();
        });
    }


});