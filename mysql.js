let mysql = require('mysql');
let pool = mysql.createPool({
	host: '0.0.0.0',
	user: 'root',
	password: 'root',
	port: '3306',
	database: "info",
});

let query = function(sql, callback){
	pool.getConnection(function(err, connect){
		if(err){
			callback(err, null);
		}else{
			connect.query(sql, function(err, result){
				connect.release();
				callback(err, result);
			});
		}
	});
};

module.exports = query;