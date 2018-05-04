const moment = require('moment');

var date = moment(); //new moment object that represents current point in getTime
console.log(date.format('MMM').toUpperCase()); //use patterns in format
//date.add(100, 'year').subtract(9, 'months');
//console.log(date.format('MMM Do, YYYY'));

//10:35 am
date.add(8, 'hours').subtract(4, 'minutes');
console.log(date.format('h:mm A'));
