var connection = require('express-myconnection');
var mysql = require('mysql');

module.exports = function(app){
	app.use(
	    connection(mysql,{
	        host    : 'localhost',
	        user    : 'root',
	        password: 'root',
	        port    :  8889,
	        database: 'lims4'
	    }, 'request')
	);
};