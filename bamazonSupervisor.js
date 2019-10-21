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
                name: "supervisorOptions",
                message: "Please choose from the options below:",
                choices: ["View Product Sales by Department", "Create New Department"]
            }
        ]).then(function (userList) {
            console.log(userList.supervisorOptions)

            if (userList.supervisorOptions === "View Product Sales by Department") {
                viewSales();
            }


        })
    };

    function viewSales() {
        var query = connection.query(
            "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS 'product sales', SUM(p.product_sales)-d.over_head_costs AS 'total profit' FROM departments d INNER JOIN products p ON d.department_name = p.department_name GROUP BY d.department_id",

            function (err, res) {
                if (err) throw err;
                console.table(res);
            }
        )
    }

});