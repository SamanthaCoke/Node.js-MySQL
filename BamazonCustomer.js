let mysql = require("mysql");
let promt = requitr("prompt");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "Bamazon"
});

connection.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');

    let schema = {
        properties: {
            ID: {
            message:"Enter the ID of the product you would like to buy.",
            pattern:
            required: true
            },
            howMany: {
            message: "Enter how many you would like to buy. ",
            pattern:
            required: true
    
        }
    }
