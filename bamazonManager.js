var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root",
	password: "Kramer!234",
	database:"bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("connection successful!");
	managerChoice();
	// makeTable function collects date from mysql database and prints it to the screen
});

function managerChoice() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add a new product",
            "Quit"
        ]
    }).then(function(answer) {
        switch(answer.action) {
            case "View products for sale":
                productsSold();
            break;

            case "View low inventory":
                lowInventory();
            break;

            case "Add to inventory":
                addInventory();
            break;

            case "Add a new product":
                newProduct();
            break;

            case "Quit":
                quitQ();
            break;
        }
    });
}


function productsSold() {
    console.log("ITEMID | ", "PRODUCTNAME | ", "DEPARTMENTNAME | ", "PRICE | ", "STOCKQUANTITY");
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].itemid + " | " + res[i].productname + " | " + res[i].departmentname + " | " + res[i].price + " | " + res[i].stockquantity);
      }
      console.log("-----------------------------------");
      managerChoice();

    });
  }

  function lowInventory() {
    console.log("ITEMID | ", "PRODUCTNAME | ", "DEPARTMENTNAME | ", "PRICE | ", "STOCKQUANTITY");
    connection.query("SELECT * FROM products WHERE stockquantity < 5", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].itemid + " | " + res[i].productname + " | " + res[i].departmentname + " | " + res[i].price + " | " + res[i].stockquantity);
      }
      console.log("-----------------------------------");
      managerChoice();

    });
  }

  function addInventory () {
    console.log("ITEMID | ", "PRODUCTNAME | ", "DEPARTMENTNAME | ", "PRICE | ", "STOCKQUANTITY");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].itemid + " | " + res[i].productname + " | " + res[i].departmentname + " | " + res[i].price + " | " + res[i].stockquantity);
        }
        console.log("-----------------------------------");

    inquirer.prompt ([{
        type: 'input',
        name: 'choice',
        message: "Enter id of the item you are adding additional stock to? [Quit with Q]"
    }]).then(function(answer) {
        var correct = false;
            if (answer.choice.toUpperCase()=="Q"){
                process.exit();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].itemid == answer.choice) {
                    correct=true;
                    var productid=answer.choice;
                    var id = i;
                    inquirer.prompt({
                        type: "input",
                        name: "quant",
                        message: "How many additional items do you want to add to stock?",
                        validate: function(value) {
                            if(isNaN(value) === false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        
                            
                       connection.query("UPDATE products SET stockquantity = '" +  (parseInt(res[id].stockquantity) + parseInt(answer.quant)) + "' WHERE itemid = '" + productid + "'", function(err,res2) {
                                console.log("Item stock increased!");
                                console.log("-------------------------------------------------------");
                                
                                
                                managerChoice();
                            })
                        })
                    }
                }
            })
        })
    }

function newProduct () {
        inquirer.prompt([{
            name: "item",
            type: "input",
            message: "What is the name of the item you wish to submit?"
        },{
            name: "department",
            type: "input",
            message: "What department should the item be placed in?"
        },{
            name: "price",
            type: "input",
            message: "How much does the item cost?"
        },{
            name: "quantity",
            type: "input",
            message: "How many items are being entered into stock?",
            validate: function(value){
                if (isNaN(value)==false){
                    return true;
                } else {
                    return false;
                }
            }
             }]).then(function(answer) {
                 connection.query("INSERT INTO products SET ?", {
                     productname: answer.item,
                     departmentname: answer.department,
                     price: answer.price,
                     stockquantity: answer.quantity
                 }, function(err,res) {
                     console.log("Your product was created successfully!");
                     managerChoice();
                 })
             })
    }

function quitQ() {
    process.exit();
}
