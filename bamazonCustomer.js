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
        for (var i = 0; i < res.length; i++) {
            var item = res[i];
            console.log(`
            Item ID: ${item.item_id}
            Product Name: ${item.product_name}
            Department: ${item.department_name}
            Price: $${item.price}`)
            console.log("---------------------------------")
        }
        inquirer.prompt([
            {
                type: "number",
                name: "productID",
                message: "What is the ID of the product you would like to purchase?"
            },
            {
                type: "number",
                name: "productQuantity",
                message: "How many would you like to purchase?"
            }
        ]).then(function(answers) {
            console.log("Product ID: " + answers.productID);
            console.log("Desired quantity: " + answers.productQuantity);
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === answers.productID) {
                    //checks is there is enough units to fuffil order
                    var stockLeft;
                    var itemPrice = res[i].price;
                    stockLeft = res[i].stock_quantity - answers.productQuantity;
                    var isStockLeft = Math.sign(stockLeft);
                    if (isStockLeft === -1) {
                        console.log("Insufficient quantity");
                    }
                    else {
                        //updates database
                        var updateQuery = `UPDATE Products SET stock_quantity = ${stockLeft} WHERE item_id = ${answers.productID}`;
                        connection.query(updateQuery, function(err, res) {
                            if (err) throw err;
                        });
                        //gives total cost
                        var cost = itemPrice * answers.productQuantity;
                        console.log(`Total cost: $${cost}`);
                    }
                }
            }
            process.exit();
        });
    });
};
