const firebase = require('firebase');
const config = require('./config.js');
const Sugar = require('sugar');
const fs = require('fs');


firebase.initializeApp(config.firebaseConfig);
database = firebase.database();

var text = fs.readFileSync("./product_conditions.txt", 'utf8');
var lines = text.toString().split("\n");
let total = [];

for (var i = 0;i < lines.length ;i++) {
    var each_item = {};
    var line_element = lines[i].split("\t");
    each_item['name'] = line_element[0] || '';
    each_item['price_from'] = line_element[1] || '';
    each_item['price_to'] = line_element[2] || '';
    each_item['condition'] = line_element[3] || '';
    total.push(each_item);
}

//console.table(total);

for (var i = 0;i < total.length ;i++) {
    console.log('---' + i);
    database.ref('product_conditions').push(total[i]);
}
