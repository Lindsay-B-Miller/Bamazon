# Bamazon

## About the Project
Bamazon is a CLI application that allows users to view and manipulate product data stored in the Bamazon database in SQL. This application is composed of three javascript files intended for three different users, all of which employ node and inquirer to respond to user queries. 
1. `bamazonCustomer.js` runs a customer-focused application that displays pertinant information about the stocked products (ID, name, department, price), and then allows the user to "purchase" a product by specifing the item ID and quantity they would like to purchase. Once completed, the application will inform the user of the price and remove the specified quantity of items from the SQL database. 
2. `bamazonManager.js` runs a manager-focused appliacation that allows the manager to pick between four paths of action, including `View Products for Sale`, `View Low Inventory`, `Add to Inventory`, and `Add New Product`.
3. `bamazonSupervisor.js` runs a supervisor-focused application that joins two tables, `products` and `departments`, to calculate information on product sales and total profit. 

### Built With
- Node 
- Inquirer
- SQL

## Getting Started
To get a local copy up and running, follow the steps below.

1. Create a SQL database `bamazon`
2. Create two tables within `bamazon`: `products` and `departments`.
* The `products` table should consist of six columns: `item_id` (auto-increment), `product_name`, `department_name`, `price`, `stock_quantity`, and `product_sales`. 
* The `departments` table should consist of three columns: `department_id`, `department_name`, and `over_head_costs`.
3. Create a `.env` file that holds your SQL password, SQL username, and SQL database name. Your file should look like this: 
`SQL_PASSWORD=my_sql_password`
`SQL_USERNAME=my_sql_username`
`SQL_DATABASE=my_sql_database`
4. Create a `.gitignore` file and add the following lines to it: 
`node_modules`
`.DS_Store`
`.env`
5. Create a javascript file called `keys.js`. Inside the file add the following lines: 
```
exports.credentials = {
  password: process.env.SQL_PASSWORD,
  user: process.env.SQL_USERNAME,
  database: process.env.SQL_DATABASE
};
```

### Prerequisites
Please install the following packages:
1. npm `npm init -y`
2. npm inquirer `npm install inquirer`
3. dotenv `npm install dotenv`

### Installation
Clone the reepo at `https://github.com/Lindsay-B-Miller/Bamazon`

## Usage 
1. `bamazonCustomer.js`
* Inside the terminal, type `node bamazonCustomer.js`.
* The app logs all of the products in the `products` table in SQL, including the item_id, product_name, department_name, and the price of the items. At the bottom of the table, the app asks ` What product would you like to buy? (Please select an item id)`
![Customer Log](./images/CustomerLog.jpg?raw=true)
* After the user enters an item ID, the app asks the user to enter the number of units he/she would like to purchase. If the user enters a number lower than the `stock_quantity`, the app will remove the number of units from the `stock_quantity` in SQL for that particular item, and will display a total purchase amount to the user.
![Successful Purchase](./images/SuccessfulPurchase.jpg?raw=true)
* If the user requests a greater number of the item than the `stock_quantity`, the app will log `Insufficient quantity! Please reduce the number of units in your order or select a different item.` and run the application again so that the user can view their purchase options and try a new purchase. 
![Insufficient Quantity](./images/InsufficientQuantity.jpg?raw=true)

2. `bamazonManager.js`
* Inside the terminal, type `node bamazonManager.js`.
* The app uses inquirer to prompt the user to select from a list of four options: `View Products for Sale`, `View Low Inventory`, `Add to Inventory`, and `Add New Product`.
![Manager Prompts](./images/ManagerPrompts.jpg?raw=true)
* `View Products for Sale`: 
- - When the user selects `View Products for Sale`, the app displays the entire `products` table from the bamazon database. 
![Manager View](./images/ManagerView.jpg?raw=true)
* `View Low Inventory`:
- - When the user selects `View Low Inventory`, the app displays all entries in the `products` table for which the `stock_quantity` are less than 5. 
![Manager Low Inventory](./images/ManagerLow.jpg?raw=true)
* `Add to Inventory`: 
- - When the user selects `Add to Inventory`, the app displays the `products` table from the bamazon database, then prompts the user to enter `For which product would you like to add more units? (Please enter an item id number)`.
![Manager Add Table](./images/ManagerAdd.jpg?raw=true)
- - The app then asks the user to enter the number of units of that product that they would like to add to the inventory.
![Manager Add Units](./images/ManagerAddUnits.jpg?raw=true)
* `Add New Product`:
- - When the user selects `Add New Product`, the app prompts the user to input the product that they would like to add. 
![Manager Add Product](./images/ManagerAddProduct.jpg?raw=true)
- - Once the user has typed a product, the app then prompts the user to select which department the product is housed within. The list is generated from the `department_name` column in the `departments` table. At the bottom of the list, the user can also choose to `Create New Department`.
![Manager Choose Dept](./images/ManagerChooseDept.jpg?raw=true)
- - The app then prompts the user to enter the price of the item
![Manager Choose Price](./images/ManagerChoosePrice.jpg?raw=true
- - Thee app then prompts the user to enter the number of items to stock. Once the user presses enter, the app inserts the new item into the `products` table in SQL.
![Manager New Product](./images/ManagerNewProduct.jpg?raw=true)
- - If the user selects `Create New Department`, the app finishes running through the item-specific prompts, then requests information on the new department. First, the user is prompted to enter the name of the new department, and then the over head cost amount. 
- - Once the user enters the information, the new item and item information is entered into the `products` table, and the new department and department information is entered into the `departments` table. 
![Manager Create New Dept](./images/CreateNewDept.jpg?raw=true)
![New Department Created](./images/NewDeptCreated.jpg?raw=true)

3. `bamazonSupervisor.js`
* Inside the terminal, type `node bamazonSupervisor.js`.
* The app uses inquirer to prompt the user to select from a list of two options: `View Product Sales by Department`, and `Create New Department`.
![Supervisor Choices](./images/SupervisorChoices.jpg?raw=true)
* `View Product Sales by Department`:
- - If the user selects `View Product Sales by Department`, the app loggs a table of the `department_id`, `department_name`, `over_head_costs`, `product_sales`, and `total_profit`. `product sales` is the sum of all sales for items in the department (previously calculated by multiplying the number of items purchased by the cost of the item). `total profit` is calculated by subtracting the `over_head_costs` from the `product sales`. 
![Supervisor View](./images/SupervisorView.jpg?raw=true)
* `Create New Department`:
- - If the user selects `Create New Department`, the app first prompts the user to enter the name of the department that they wish to create.
![Supervisor New Department](./images/SupervisorNewDept.jpg?raw=true)
- - The app then asks the user to enter the over head cost of the department. Once the user has entered the information, the app creates a new row in the `departments` table with the new information. This new department will also be accessible in the `bamazonManager.js` file when adding a new product.
![Supervisor Final](./images/SupervisorFinal.jpg?raw=true)

## Contact
Lindsay B Miller created this project with instructions from Trilogy Education Services.

Project Link: https://github.com/Lindsay-B-Miller/liri-node-app

Deployed Link: https://lindsay-b-miller.github.io/liri-node-app/

