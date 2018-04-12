var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root",
	password: "Kramer!234",
	database:"bamazon"
})

connection.connect(function(err){
	if (err) throw err;
	console.log("connection successful!");
	makeTable();
	// makeTable function collects date from mysql database and prints it to the screen
})


//go to node and test connection
//node bamazon.js should get connection successful! message

var makeTable = function() {
	console.log("ITEMID || ", "PRODUCTNAME || ", "DEPARTMENTNAME || ", "PRICE || ", "STOCKQUANTITY");
	connection.query("SELECT * FROM products", function(err,res){
		for(var i = 0; i<res.length; i++){
			console.log(res[i].itemid + " || " + res[i].productname + " || " +
				res[i].departmentname + " || " + res[i].price + " || " + res[i].stockquantity + "\n");
			// run again here to see if it works
		}
	promptCustomer(res);
	})
}

var promptCustomer = function(res) {
	inquirer.prompt ([{
		type: 'input',
		name: 'choice',
		message: "Enter id of the item you like to purchase? [Quit with Q]"
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
						message: "How many would you like to buy?",
						validate: function(value) {
							if(isNaN(value) === false) {
								return true;
							} else {
								return false;
							}
						}
					}).then(function(answer) {
						if((res[id].stockquantity-answer.quant)>0){
							connection.query("UPDATE products SET stockquantity = '" + (res[id].stockquantity - answer.quant) + "' WHERE itemid = '" + productid + "'", function(err,res2) {
								connection.query("UPDATE departments SET productSales = productSales+"+(answer.quant*res[id].price)+",totalSales=productSales=overheadCosts WHERE departmentName='"+res[id].departmentName+"';", function(err,res3) {
									console.log("Sales added to department");
								})
								console.log("Product Bought!");
								makeTable();
							})
						} else {
							console.log("Insufficent stock to meet order!");
							promptCustomer(res);
						}
					})
				}
			}
			if(i==res.length && correct ==false){
				console.log("Not a valid selection!");
				promptCustomer(res);
			}
		})

	}
