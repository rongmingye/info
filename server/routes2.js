var query = require('./mysql.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

var getNowTime = require('./date.js');

// app 管理 get/post
function routes2(app){

	// 发布招聘信息
	app.post('/employ/publish', urlencodedParser, function(req, res){
		console.log("/employ/publish");
		var request = req.body;
		var sql = "insert into recruit(company, address, post, required, salary, eatLive, relation) values('"
			+request.company+"','"+request.address+"','"+request.post+"','"+request.required
			+"','"+request.salary+"','"+request.eatLive+"','"+request.relation+"')";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
	    		code: 1,
	    		data: "success",
	    	}
			console.log("/employ/publish success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 查询招聘信息
	app.post('/employ/info', urlencodedParser, function(req, res){
		console.log("/employ/info");
		var sql = "select * from recruit";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}

			result.map(function(item, index){
				// console.log(item);
				item.required = item.required.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				item.required = item.required.replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />");
				item.required = item.required.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			});
	    	var data = {
	    		code: 1,
	    		data: result,
	    	}
			console.log("/employ/info success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 获取校园风采列表
	app.post('/school/news', urlencodedParser, function(req, res){
		console.log("/school/news");
		var sql = "select * from news";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/school/news success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取班级学生的信息
	app.post('/school/classStudents', urlencodedParser, function(req, res){
		console.log("/school/classStudents");
		var sql = "select * from student where class_name ='"+req.body.className+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/school/classStudents success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取问题列表
	app.post('/board/getQuestions', urlencodedParser, function(req, res){
		console.log("/board/getQuestions");
		var sql = "select * from question";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/board/getQuestions success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题和评论
	app.post('/board/getQuestion', urlencodedParser, function(req, res){
		console.log("/board/getQuestion");
		var sql =  "select * from question where question_id = '"+req.body.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result[0]
			}
			console.log("/board/getQuestion success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题的评论
	app.post('/board/getComments', urlencodedParser, function(req, res){
		console.log("/board/getComments");
		var sql =  "select * from comment where question_id = '"+req.body.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/board/getComments success");
			res.send(data);
			res.end();  
	    });
	});

	// 获取当前问题的回复
	app.post('/board/getReplys', urlencodedParser, function(req, res){
		console.log("/board/getReplys");
		var sql = "select * from reply where question_id = '"+req.body.questionId+"'";
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: result
			}
			console.log("/board/getReplys success");
			res.send(data);
			res.end();  
	    });
	});

	// 发布问题
	app.post('/board/publicQuestion', urlencodedParser, function(req, res){
		console.log("/board/publishQuestion");
		console.log(req.body);
		var request = req.body;
		var sql = "insert into question(question_author, question_content, timer) values('"
			+request.author+"','"+request.content+"','"+request.timer+"')";
		console.log(sql);
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/board/publicQuestion success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 发布评论
	app.post('/board/publicComment', urlencodedParser, function(req, res){
		console.log("/board/publicComment");
		console.log(req.body);
		var request = req.body;
		var sql = "insert into comment(question_Id, comment_author, target_name , comment_timer, comment_content) values('"
			+request.questionId+"','"+request.author+"','"+request.target+"','"+ request.timer+"','"+request.content+"')";
		console.log(sql);
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/board/publicComment success");
			res.send(data);
	        res.end();  	
	    });
	});

	// 发布回复
	app.post('/board/publicReply', urlencodedParser, function(req, res){
		console.log("/board/publicReply");
		console.log(req.body);
		var request = req.body;
		var sql = "insert into reply(question_id,comment_id, reply_author, target_name , reply_timer, reply_content) values('"
			+request.questionId+"','"+request.commentId+"','"+request.author+"','"+request.target+"','"+ request.timer+"','"+request.content+"')";
		console.log(sql);
	    query(sql, function(err, result){
			if(err) {
				console.log(err.message);
				return;
			}
			var data = {
				code: 1,
				data: "success"
			}
			console.log("/board/publicComment success");
			res.send(data);
	        res.end();  	
	    });
	});

}

module.exports = routes2;
