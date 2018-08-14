var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var getNowTime = require('./date.js');

// app 管理 get/post
function routes(app){

	// 获取该老师的学生们的实习信息
	app.post('/teacher/practices', urlencodedParser, function(req, res){
		console.log("/teacher/practices");
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.teacher_name ='"
			+req.body.teacher_name+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/teacher/practices success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取该学生的实习信息
	app.post('/student/practice', urlencodedParser, function(req, res){
		console.log("/student/practice");
		var odata = req.body;
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.student_name ='"+odata.student_name+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			
			var data = {
				code: 1,
				data: result[0]
			}
			console.log("/student/practice success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 获取用户信息
	app.post('/user/info', urlencodedParser, function(req, res){
		console.log("/user/info");
		if(req.body.userType==="student"){
			var sql = "select * from student where student_name ='"+req.body.username+"'";
		}else if(req.body.userType==="teacher"){
			var sql = "select * from teacher where teacher_name ='"+req.body.username+"'";
		}
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			
			var data = {
				code: 1,
				data: result[0],
			}
			console.log("/user/info success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 修改学生实习信息
	app.post('/student/publicPractice', urlencodedParser, function(req, res){
		console.log("/student/publicPractice");
		var sql = "update info set" 
		+" teacher_name = '" + req.body.teacher_name
		+"', teacher_tel = '" + req.body.teacher_tel
		+"', practice_company = '" + req.body.practice_company
		+"', practice_time = '" + req.body.practice_time
		+"', practice_long = '" + req.body.practice_long
		+"', practice_type = '" +req.body.practice_type
		+"', post = '" + req.body.post
		+"', relation_name = '" + req.body.relation_name
		+"', relation_tel = '" + req.body.relation_tel
		+"', arrange = '" + req.body.arrange
		+"', company_taken = '" + req.body.company_taken
		+"', tenBreak = '" + req.body.tenBreak 
		+"', sixteenBreak = '" + req.body.sixteenBreak 
		+"', changed = '" + req.body.changed 
		+"', remark = '"+ req.body.remark
		+"' WHERE student_name ='" + req.body.student_name+"'";

	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/student/publicPractice success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 修改密码
	app.post('/user/repassword', urlencodedParser, function(req, res){
		console.log("/user/repassword");
		if(req.body.userType === "teacher"){
			var sql1 = "select * from  teacher where teacher_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				if(result[0].teacher_pwd === req.body.oldPwd){
					var sql2 = "update teacher set" +" teacher_pwd = '" + req.body.newPwd 
					+ "' WHERE  teacher_name ='" + req.body.username + "'";
					query(sql2, function(err, result){
						if(err) {
							console.log(err.message);
							return;
						}
						console.log("/user/repassword success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("/user/repassword fail");
					res.send("fail");
		        	res.end(); 
				}
		    });

		}else if(req.body.userType === "student"){
			var sql1 = "select * from  student where student_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				if(result[0].student_pwd === req.body.oldPwd){
					var sql2 = "update student set" +" student_pwd = '" + req.body.newPwd 
					+ "' WHERE  student_name ='" + req.body.username + "'";
					query(sql2, function(err, result){
						if(err) {
							console.log(err.message);
							return;
						}
						console.log("/user/repassword success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("/user/repassword fail");
					res.send("fail");
		        	res.end(); 
				}
		    });
		}
	});

	
	// 修改用户信息
	app.post('/user/changeInfo', urlencodedParser, function(req, res){
		console.log("/user/changeInfo");
		if(req.body.userType === "teacher"){
			var sql1 = "update teacher set teacher_tel='"+ req.body.tel+"' where teacher_name = '" + req.body.username+"'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				var data = {
					code: 1,
					data: "success"
				}
				console.log("/user/changeInfo success");
				res.send(data);
	        	res.end(); 
		    });

		}else if(req.body.userType === "student"){
			var sql1 = "update student set student_tel='"+ req.body.tel+"' WHERE student_name ='" + req.body.username + "'";
			query(sql1, function(err, result){
				if(err) {
					console.log(err.message);
					return;
				}
				var data = {
					code: 1,
					data: "success"
				}
				console.log("/user/changeInfo success");
				res.send(data);
	        	res.end(); 
				
		    });
		}
	});

}

module.exports = routes;
