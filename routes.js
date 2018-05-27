var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

// app 管理 get/post
function routes(app){

	// 获取该老师的学生们的信息
	app.post('/getStudentsInfo', urlencodedParser, function(req, res){
		console.log("getStudentsInfo");
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.teacher_name ='"
			+req.body.teacher_name+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("getStudentsInfo success");
			res.send(result);
			res.end();  
	    });
	});

	// 获取该学生的信息
	app.post('/getStudentInfo', urlencodedParser, function(req, res){
		console.log("getStudentInfo");
		var sql = "select * from student inner join info on student.student_id = info.student_id where info.student_name ='"+req.body.student_name+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("getStudentInfo success");
			res.send(result[0]);
	        res.end();  	
	    });
	});

	// 获取侧边信息
	app.post('/getSideInfo', urlencodedParser, function(req, res){
		console.log("getSideInfo");
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
			console.log("getSideInfo success");
			res.send(result[0]);
	        res.end();  	
	    });
	});

	// 修改学生信息
	app.post('/reviseStudentInfo', urlencodedParser, function(req, res){
		console.log("reviseStudentInfo");
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
		+"' WHERE student_name ='" + req.body.studentName+"'";

	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			console.log("reviseStudentInfo success");
			res.send("success");
	        res.end();  	
	    });
	});

	// 修改密码
	app.post('/modifyPwd', urlencodedParser, function(req, res){
		console.log("modifyPwd");
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
						console.log("modifyPwd success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("modifyPwd fail");
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
						console.log("modifyPwd success");
						res.send("success");
		        		res.end();  	
					});
				}else{
					console.log("modifyPwd fail");
					res.send("fail");
		        	res.end(); 
				}
		    });
		}
	});

}


//获取当前时间
function getNowFormatTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();

        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        
        var currentTime = year + seperator1 + month + seperator1 + strDate+ " "+
                        + hour + seperator2 + minute + seperator2 + second;
        return currentTime;
}

module.exports = routes;
