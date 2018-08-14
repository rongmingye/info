$(function(){

	var oDataSource = {
		/*
		* 获取论坛信息
		* params: {}
		*/
		getQuestions: function(oData){
			return $.ajax({
				url: Site("board.getQuestions"),
				type: "post",
				data: oData
			})
		},

		/*
		* 提交新问题
		* params: {author, timer, content}
		*/
		submitQuestion: function(oData) {
			return $.ajax({
				url: Site("board.publicQuestion"),
				type: "post",
				data: oData
			})
		}
	}

	getQuestions();
	// 获取问题
	function getQuestions(){
		$("#box").html("");
		oDataSource.getQuestions()
		.done(function(res){
			// console.log(res);
			$.each(res.data, function(i, item){
				$("#box").prepend(questionTempl(item));
			})
		})
		.fail(function(err){
			console.log(err);
		})
	}

	//一个问题的模板
	function questionTempl(item){
		return (
			"<a class='list-group-item clearfix' href='detailQuestion.html?questionId="+item.question_id+"' id='"+item.question_id+"'>"+item.question_content
			+"<span class='pull-right'>作者："+item.question_author +"&nbsp;&nbsp;&nbsp;&nbsp;"+ item.timer+"</span></a>"
		)
	}

	// 点击保存，提交问题
	$("#save").click(function(){
		var check = $("#publicQuestionForm").validate();
		if( check.form() == false){
			return ;
		}
		var author = sessionStorage.getItem("username");
		if(sessionStorage.getItem("studentClass")){
			author = sessionStorage.getItem("studentClass")+" "+author
		}
		var params = {
			author: author,
			timer: getNowTime(),
			content: $("#content").val()
		};
		oDataSource.submitQuestion(params)
		.done(function(res){
			// console.log(res);
			swal({
				title: "提交成功",
				type: "success"
			})
			getQuestions();
			$("#publicQuestionModal").modal("toggle");
		})
		.fail(function(err){
			console.log(err);
		})
	})

	// 表单验证
	$("#publicQuestionForm").validate({
		rules: {
			content: "required",
		},
		messages: {
			content: "话题内容不能空",
		},
		errorElement: "span",
        errorClass: "text-danger",
        errorPlacement: function($error, $control){
            $("#errorMsg").html($error);
        }
	})

	function getNowTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";

        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1;
        var strDate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        
        var hour = date.getHours() < 10 ? '0'+date.getHours(): date.getHours();
        var minute = date.getMinutes() < 10 ? '0'+date.getMinutes(): date.getMinutes();
        // var second = date.getSeconds() < 10 ? '0'+date.getSeconds(): date.getSeconds();

        var currentTime = year + seperator1 + month + seperator1 + strDate+ " "
                        + hour + seperator2 + minute;
        return currentTime;
	}

})
