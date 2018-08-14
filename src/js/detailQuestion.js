$(function(){
	var questionId = GetQueryString("questionId");
	var currentYear = new Date().getFullYear();

	var oDataSource = {
		/*
		* 获取该问题的内容
		* params: { questionId }
		*/
		getQuestion: function(oData){
			return $.ajax({
				url: Site("board.getQuestion"),
				type: "post",
				data: oData
			})
		},

		/*
		* 获取评论
		*params: { questionId }
		*/
		getComments: function(oData){
			return $.ajax({
				url: Site("board.getComments"),
				type: "post",
				data: oData
			})
		},

		/*
		* 获取回复
		*params: { questionId }
		*/
		getReplys: function(oData){
			return $.ajax({
				url: Site("board.getReplys"),
				type: "post",
				data: oData
			})
		},

		/*
		 *提交评论
		 * params: { questionId, comment_author, target, comment_timer, comment_content}
		*/
		submitComment: function(oData){
			return $.ajax({
				url: Site("board.publicComment"),
				type: "post",
				data: oData
			})
		},

		/*
		 * 提交回复
		 * params: { questionId, commentId, reply_author, target, reply_timer, reply_content}
		*/
		sbumitReply: function(oData){
			return $.ajax({
				url: Site("board.publicReply"),
				type: "post",
				data: oData
			})
		}
	}

	getQuestion();
	// 获取该问题
	function getQuestion(){
		$("#questionTitle").html("");
		var params = {
			questionId: questionId
		}
		oDataSource.getQuestion(params)
		.done(function(res){
			// console.log(res);
			$("#questionTitle").html(questionTempl(res.data));
			var target = res.data.question_author;
			submitComment(target);
			getComments();
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 获取评论
	function getComments(){
		$("#commentBox").html("");
		var params = {
			questionId: questionId
		}
		oDataSource.getComments(params)
		.done(function(res){
			// console.log(res);
			if(res.data.length != 0){
				$.each(res.data, function(i, item){
					$("#commentBox").append(commentTempl(item));
				});
				getReplys();
			}else{
				$("#commentBox").append('<p>还没有评论喔~</p>');
			}
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 获取回复
	function getReplys(){
		var params = {
			questionId: questionId
		}
		oDataSource.getReplys(params)
		.done(function(res){
			// console.log(res);
			if(res.data.length != ""){
				$.each(res.data, function(i, item){
					$("#commentId"+item.comment_id).append(replyTempl(item));
				});
			}
		})
		.fail(function(err){
			console.log(err);
		}).always(function(){
			replyModal();
		})
	}
	
	// 提交评论
	function submitComment(target){
		$("#save").click(function(){
			var check = $("#publicCommentForm").validate();
			if( check.form() == false){
				return ;
			}
			var author = sessionStorage.getItem("username");
			if(sessionStorage.getItem("studentClass")){
				author = sessionStorage.getItem("studentClass")+" "+author
			}
			var params = {
				questionId: questionId,
				author: author,
				target: target,
				timer: getNowTime(),
				content: $("#content").val()
			};
			oDataSource.submitComment(params)
			.done(function(res){
				// console.log(res);
				swal({
					title: "提交成功",
					type: "success"
				})
				$("#content").val("");
				getQuestion();
				$("#publicCommentModal").modal("toggle");
			})
			.fail(function(err){
				console.log(err);
			})
		})
	}

	// 提交回复
	function sbumitReply(commentId, target){
		$("#replySave").click(function(){
			var check = $("#publicReplyForm").validate();
			if( check.form() == false){
				return ;
			}
			var author = sessionStorage.getItem("username");
			if(sessionStorage.getItem("studentClass")){
				author = sessionStorage.getItem("studentClass")+" "+author
			}
			var params = {
				questionId: questionId,
				commentId: commentId,
				author: author,
				target: target,
				timer: getNowTime(),
				content: $("#replyContent").val()
			};
			// console.log("回复params:"+ JSON.stringify(params));
			oDataSource.sbumitReply(params)
			.done(function(res){
				// console.log(res);
				swal({
					title: "提交成功",
					type: "success"
				})
				$("#replyContent").val();
				getComments();
				$("#publicReplyModal").modal("toggle");
			})
			.fail(function(err){
				console.log(err);
			})
		})
	}

	// 回复的模态框
	function replyModal(){
		$("#commentBox .reply").click(function(){
			var commentId = $(this).attr("id");
			var target = $(this).data("target");
			$("#replyTitle").text("回复"+target);
			sbumitReply(commentId, target);
			$("#publicReplyModal").modal("toggle");
		})
	}


	//一个问题的html结构
	function questionTempl(item){
		return (
			"<h3 class='text-center clearfix' href='javascript:;' >"+item.question_content
			+"<span class='pull-right'>作者："+item.question_author +"&nbsp;&nbsp;&nbsp;&nbsp;"+ item.timer+"</span></h3>"
		)
	}

	// 一个评论的html结构
	function commentTempl(item){
		if( item.comment_timer.split("-")[0] == currentYear){
			item.comment_timer =  item.comment_timer.split("-").slice(1).join('-');
		}
		return (
			'<div class="m-b-sm" style="border-bottom: 1px solid #ccc; padding-bottom: 5px;" id="commentId'+item.comment_id+'">'+
			  	'<div class="m-b-sm">'+
			   	 	'<h4 class="clearfix">'+item.comment_author +'：<span class="m-l-sm">'+item.comment_timer+'</span>'+
			   	 		'<span class="pull-right reply m-r-md" id="'+item.comment_id+'" data-target="'+item.comment_author+'">回复 </span></h4>'+
			   		'<div class="comment-content m-l-md">'+item.comment_content+'</div>'+
			  	'</div>'+
			'</div>');
	}

	// 一个回复的模板
	function replyTempl(item){
		if( item.reply_timer.split("-")[0] == currentYear){
			item.reply_timer =  item.reply_timer.split("-").slice(1).join('-');
		}
		return (
			'<div class="m-l-md">'+
				'<div class="clearfix">'+item.reply_author+'&nbsp;@&nbsp;'+ item.target_name+'：<span class="m-l-sm">'+item.reply_timer+'</span>'+
					'<span class="pull-right reply m-r-md" id="'+item.comment_id+'" data-target="'+item.reply_author+'">回复 </span>'+
				'</div>'+
				'<div class="m-l-lg">'+item.reply_content+'</div>'+
			'</div>'
			);
	}

	// 发布评论表单验证
	$("#publicCommentForm").validate({
		rules: {
			content: "required",
		},
		messages: {
			content: "评论内容不能空",
		},
		errorElement: "span",
        errorClass: "text-danger",
        errorPlacement: function($error, $control){
            $("#errorMsg").html($error);
        }
	});

	// 发布回复表单验证
	$("#publicReplyForm").validate({
		rules: {
			replyContent: "required",
		},
		messages: {
			replyContent: "回复内容不能空",
		},
		errorElement: "span",
        errorClass: "text-danger",
        errorPlacement: function($error, $control){
            $("#replyErrorMsg").html($error);
        }
	});


	// 获取当前时间
	function getNowTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";

        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1;
        var strDate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        
        var hour = date.getHours() < 10 ? '0' + date.getHours(): date.getHours();
        var minute = date.getMinutes() < 10 ? '0'+ date.getMinutes(): date.getMinutes();
        // var second = date.getSeconds() < 10 ? '0'+date.getSeconds(): date.getSeconds();

        var currentTime = year + seperator1 + month + seperator1 + strDate+ " "
                        + hour + seperator2 + minute;
        return currentTime;
	}

	// 获取url参数
	function GetQueryString(name){
     	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     	var r = window.location.search.substr(1).match(reg);
     	if(r!=null)return  unescape(r[2]); return null;
	}

})
