var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "221bBakerStreet!",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    productList();
});

function productList(listProducts) {
    var query = "select * from Products";
    connection.query(query, {listProducts}, function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "menu",
                message: "Choose an option",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ]).then(function(answers) {
            switch (answers.menu) {
                case "View Products for Sale":
                    console.log("Selected Menu: " + answers.menu);
                    viewProducts();
                    break;   
                
                case "View Low Inventory":
                    console.log("Selected Menu: " + answers.menu);
                    viewLowInv();
                    break;
                
                case "Add to Inventory":
                    console.log("Selected Menu: " + answers.menu);
                    addInv();
                    break; 

                case "Add New Product":
                    console.log("Selected Menu: " + answers.menu);
                    addProduct();
                    break; 
            }
            function viewProducts() {
                for (var i = 0; i < res.length; i++) {
                    var item = res[i];
                    console.log(`
                    Item ID: ${item.item_id}
                    Product Name: ${item.product_name}
                    Item Price: $${item.price}
                    Item Quantity: ${item.stock_quantity}`)
                    console.log("--------------------------------------")
                }
            }
            function viewLowInv() {
                for (var i = 0; i < res.length; i++) {
                    var item = res[i];
                    if (item.stock_quantity < 5) {
                        console.log(`
                        Item ID: ${item.item_id}
                        Product Name: ${item.product_name}
                        Item Price: $${item.price}
                        Item Quantity: ${item.stock_quantity}`)
                        console.log("--------------------------------------")
                    }
                }
            }
            function addInv() {
                console.log("some string");
                inquirer.prompt([
                    {
                        type: "number",
                        name: "product",
                        message: "What product would you like to addd more quantity to?"
                    },
                    {
                        type: "number",
                        name: "ammount",
                        message: "How many would you like to add?"
                    }
                ]).then(function(answers) {
                    console.log("product id: " + answers.product);
                    console.log("product ammout: " + answers.ammount);
                });
            }
            function addProduct() {

            }
            process.exit();
        });
    });
};