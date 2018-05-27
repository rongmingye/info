var express = require('express'); // 快速构建服务器
var app = express();

var routes = require('./routes.js');
var query = require('./mysql.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser({extended: false});

app.use(express.static(__dirname+"/build")); //views路径
routes(app);

  app.get('*', function(req, res){
      res.sendFile(__dirname+'/build/index.html');
  });

  // 登陆
  app.post('/login', urlencodedParser, function(req, res){
    var sql = "select * from "+ req.body.userType;
      query(sql, function(err, result){
      if(err) {
        console.log(err.message);
        return;
      }
      var isHave = false;
      result.map(function(item, i){
        if( req.body.userType === "teacher"){
          if(req.body.username == item.teacher_name && req.body.pwd == item.teacher_pwd){
            isHave = true;
          }
        }else if( req.body.userType === "student"){
            if(req.body.username == item.student_name && req.body.pwd == item.student_pwd){
            isHave = true;
          }
        }
      });

      if(isHave){
        console.log("login success");
        isHave = false;
        res.send("success");
      }else{
        console.log("login fail");
        res.send("fail");
      }
      res.end();  
      });
  });

    // 定时连接mysql， 解决8小时断开连接mysql问题
  let count = 0;
  setInterval(function(){
    let sql = "select * from student where id = '1'";
    query(sql, function(err, result){
      if(err) {
        console.log(err.message);
        return;
      }
      count++;
      console.log("mysql+request"+ count);
      });

  }, 1000*60*60*7);
  
  // 监听端口
  var server = app.listen(4001, '0.0.0.0', function(){
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log("http://%s:%s", host, port);
  });
