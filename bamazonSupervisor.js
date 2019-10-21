var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "bootcamp",
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
            else if (userList.supervisorOptions === "Create New Department") {
                createDepartment();
            }

        })
    };

    function viewSales() {
        var query = connection.query(
            "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS 'product sales', SUM(p.product_sales)-d.over_head_costs AS 'total profit' FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY d.department_id",
            function (err, res) {
                if (err) throw err;
                console.table(res);
            },
        );
        connection.end()
    }

    function createDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "deptName",
                message: "What department would you like to create?"
            },
            {
                type: "input",
                name: "overHead",
                message: "What is the overhead cost of this department?"
            }
        ]).then(function (userDept) {
            console.log(userDept.deptName);
            console.log(userDept.overHead);

            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: userDept.deptName,
                    over_head_costs: userDept.overHead
                },
                // Displaying item inserted
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " new department inserted\n")
                },
            )
            connection.end();
        })
    }

});