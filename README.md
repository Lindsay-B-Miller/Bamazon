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
* If the user requests a greater number of the item than the `stock_quantity`, the app will log `Insufficient quantity! Please reduce the number of units in your order or select a different item.` and run the application again so that the user can view their purchase options and try a new purchase. 

2. `bamazonManager.js`
*
