var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
                end();
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
                inquirer.prompt([
                    {
                        type: "number",
                        name: "product",
                        message: "What product would you like to add more quantity to?"
                    },
                    {
                        type: "number",
                        name: "ammount",
                        message: "How many would you like to add?"
                    }
                ]).then(function(answers) {
                    var productToAddID = answers.product;
                    var ammountToAdd = answers.ammount;
                    var oldQuantity;
                    connection.query("select * from Products WHERE item_id = " + productToAddID + "", function(err, res) {
                        if (err) throw err;
                        oldQuantity = res[0].stock_quantity;
                        console.log("product id: " + productToAddID);
                        console.log("ammount added " + ammountToAdd);
                        console.log("old quantity " + oldQuantity);
                        var newQuantity = oldQuantity + ammountToAdd;
                        console.log("new quantity " + newQuantity);

                        var addQuery = `UPDATE Products SET stock_quantity = ${newQuantity} WHERE item_id = ${answers.product}`;
                        connection.query(addQuery, function(err, res) {
                            if (err) throw err;
                            end();
                            });
                        });
                    });
                
            }
            function addProduct() {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "newProduct",
                        message: "What is the name of the product you would like to add?"
                    },
                    {
                        type: "input",
                        name: "newProductPrice",
                        message: "What is the price of this new product? $"
                    },
                    {
                        type: "number",
                        name: "newProductQuantity",
                        message: "How many units of this product do you have?"
                    },
                    {
                        type: "input",
                        name: "newProductDepartment",
                        message: "What department is this product located in?"
                    }
                ]).then(function(newProduct) {
                    console.log(newProduct);
                    end();
                });
            }
            function end(){
                process.exit();
            }
        });
    });
};
