let mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "newuser",
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }

  console.log("Connection established");

  connection.query("SELECT * FROM products", function (err, products) {
    if (err) {
      console.log(err);
      return;
    }
    console.table(products);
    inquirer
      .prompt([
        { type: "input", name: "id", message: "What is the ID of the product you would like to buy?" },
        { type: "input", name: "count", message: "How many units of the product you would like to buy?" },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        let id = answers.id;
        let count = parseInt(answers.count);
        let quant = parseInt(products[id-1].stock_quantity)
       

        if(quant < count) {
            console.log("You dont have enought");
            return; 
        } else {
            let newQuant = quant - count;
            connection.query(`UPDATE products SET stock_quantity='${newQuant}' where item_id='${id}'`, function(err, res){
                let product = products[id-1]
                let total = product.price * count;
                console.log(`Item: ${product.product_name}; Your total cost is: ${total}`)
            })
           
        }
        
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log("bummer", error);
        } else {
          // Something else when wrong
          console.log("terrible", error);
        }
      });
  });
});
