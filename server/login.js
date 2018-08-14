var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

function login(app){
	// 登陆
	app.post('/user/login', urlencodedParser, function(req, res){
		var odata = req.body;
		console.log(odata.userType);
		var sql = "select * from "+ odata.userType;
		query(sql, function(err, result){
		    if(err) {
		        console.log(err.message);
		        return;
		     }
		  	var isHave = false;
		  	result.map(function(item, i){
		    	if( odata.userType === "teacher"){
		     		 if(odata.username == item.teacher_name && odata.password == item.teacher_pwd){
		        		isHave = true;
		      		}
		   		}else if(odata.userType === "student"){
		        	if(odata.username == item.student_name && odata.password == item.student_pwd){
		        		isHave = true;
		      		}
		    	}
		  	});

		    if(isHave){
		        console.log("login success");
		        isHave = false;
		        var data = {
		        	code: 1,
		        	result: { username:odata.username, userType: odata.userType },
		        	msg: "登陆成功"
		        }
		        res.json(data);
		    }else{
		        console.log("login fail");
		        var data = {
		        	code: 0,
		        	result: null,
		        	msg: "没有该用户"
		        }
		        res.json(data);
		    }
	      	res.end();  
		});
	});
}

module.exports = login;