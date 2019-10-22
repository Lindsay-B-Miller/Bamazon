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

## Usage 

