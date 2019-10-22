var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var keys = require("./keys.js");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: keys.credentials.user,

    // Your password
    password: keys.credentials.password,
    database: keys.credentials.database
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
                    // var stockQuantity;
                    // console.log(addUser.addInventory);
                    // console.log(addUser.addNumUnits);
                    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [addUser.addInventory], function (err, res) {
                        var stockQuantity = (res[0].stock_quantity);

                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    // Change way of grabbing id
                                    stock_quantity: (parseInt(addUser.addNumUnits) + parseInt(stockQuantity))
                                },
                                {
                                    item_id: addUser.addInventory
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                // console.log(res),
                                connection.end();
                            }
                        )
                    })
                })
                // connection.end();
            }
        )
    };



    function addProduct() {
        var array = [];
        var newDept = "";

        // Trying to make the choices appear as the department names      
        var query = connection.query(
            "SELECT department_name FROM departments",
            function (err, res) {
                if (err) throw err;

                // Trying to make the choices appear as the department names
                for (i = 0; i < res.length; i++) {
                    array.push(res[i].department_name)
                };
                array.push("Create New Department")
                inquirer.prompt([
                    {
                        type: "input",
                        name: "productName",
                        message: "What product would you like to add?"
                    },
                    {
                        type: "list",
                        name: "departmentName",
                        message: "What department houses this item?",
                        choices: array
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

                    if (userNewItem.departmentName === "Create New Department") {
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "newDepartment",
                                message: "Please enter the name of the department in which your new item is housed"
                            },
                            {
                                type: "input",
                                name: "overHead",
                                message: "What is the overhead cost of this department?"
                            }
                        ]).then(function (userNewDepartment) {
                            newDept = userNewDepartment.newDepartment
                            var query = connection.query(
                                "INSERT INTO products SET?",
                                {
                                    product_name: userNewItem.productName,
                                    department_name: newDept,
                                    price: userNewItem.price,
                                    stock_quantity: userNewItem.quantity
                                },

                                // Displaying item inserted
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " item inserted into products\n")
                                },
                            );
                            var query = connection.query(
                                "INSERT INTO departments SET?",
                                {
                                    department_name: newDept,
                                    over_head_costs: userNewDepartment.overHead
                                },
                                // Displaying item inserted
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " item inserted into departments\n")
                                },
                                connection.end()
                            );
                        })
                    }

                    else {
                        var query = connection.query(
                            "INSERT INTO products SET?",
                            {
                                product_name: userNewItem.productName,
                                department_name: userNewItem.departmentName,
                                price: userNewItem.price,
                                stock_quantity: userNewItem.quantity
                            },

                            // Displaying item inserted
                            function (err, res) {
                                if (err) throw err;
                                console.log(res.affectedRows + " item inserted!\n")
                            },
                        );
                        connection.end();
                    }
                });
            }
        )
    }


});