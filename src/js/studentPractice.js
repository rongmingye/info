$(function(){

	var oDataSource = {

		/*
		* 获取实习信息
		* params: { student_name}
		*/
		studentPractice: function(oData){
			return $.ajax({
				url: Site("student.practice"),
				type: "post",
				data: oData
			})
		},

		/*
		* 发布/修改实习信息
		* params: {}
		*/
		changeStudnetPractice: function(oData){
			return $.ajax({
				url: Site("student.publicPractice"),
				type: "post",
				data: oData
			})
		}
	}

	getPracticeInfo();
	// 获取该学生的实习信息
	function getPracticeInfo(){
		$("#box").html("");
		var params = {
			student_name: sessionStorage.getItem('username')
		}
		// console.log("学生实习:"+ JSON.stringify(params));
		oDataSource.studentPractice(params)
		.done(function(res){
			// console.log(res);
			$("#box").append(practiceTemp(res.data));
			changeModelDefault(res.data);
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 实习信息的内容
	function practiceTemp(item){
		return (
			"<div class='m-l-md'><p><span>指导老师：</span>" + item.teacher_name + "</p>"+
			"<p><span>指导老师电话：</span>"+ item.teacher_tel + "</p>"+
			"<p><span>实习公司：</span>"+ item.practice_company + "</p>"+
			"<p><span>实习岗位：</span>"+ item.post + "</p>"+
			"<p><span>实习时间：</span>"+ item.practice_time + "</p>"+
			"<p><span>实习多久：</span>"+ item.practice_long + "</p>"+
			"<p><span>安排形式：</span>"+ item.practice_type+ "</p>"+
			
			"<p><span>实习公司联系人：</span>"+ item.relation_name+"</p>"+
			"<p><span>实习公司联系人电话：</span>" + item.relation_tel + "</p>"+
			"<p><span>安排形式：</span>" + item.arrange + "</p>"+
			
			"<p><span>企业是否录用：</span>"+ item.company_taken + "</p>"+
			"<p><span>是否突破《规定》第十条要求：</span>" + item.tenBreak + "</p>"+
			"<p><span>是否突破《规定》第十六条要求，突破内容：</span>"+ item.sixteenBreak +"</p>"+
			"<p><span>工作变动记录：</span>"+ item.changed +"</p>"+
			"<p><span>备注：</span>"+ item.remark +"</p></div>"
		)
	}

	// 获取默认的实习信息填写在修改表单里
	function changeModelDefault(item){
		$("#teacher_name").val(item.teacher_name);
		$("#teacher_tel").val(item.teacher_tel);
		$("#practice_company").val(item.practice_company);
		$("#post").val(item.post);
		$("#practice_time").val(item.practice_time);
		$("#practice_long").val(item.practice_long);
		$("#practice_type").val(item.practice_type);
		$("#relation_name").val(item.relation_name);
		$("#relation_tel").val(item.relation_tel);
		$("#arrange").val(item.arrange);
		$("#company_taken").val(item.company_taken);
		$("#tenBreak").val(item.tenBreak);
		$("#sixteenBreak").val(item.sixteenBreak);
		$("#changed").val(item.changed);
		$("#remark").val(item.remark);
	}

	/*---------------------修改实习的信息-----------------*/


	$("#save").click(function(){
		submitPublish();
	});

	function submitPublish(){
		var params = {
			student_name: sessionStorage.getItem('username'),
			teacher_name: $("#teacher_name").val(),
			teacher_tel: $("#teacher_tel").val(),
			practice_company: $("#practice_company").val(),
			post: $("#post").val(),
			practice_time: $("#practice_time").val(),
			practice_long: $("#practice_long").val(),
			practice_type: $("#practice_type").val(),
			relation_name: $("#relation_name").val(),
			relation_tel: $("#relation_tel").val(),
			arrange: $("#arrange").val(),
			company_taken: $("#company_taken").val(),
			tenBreak: $("#tenBreak").val(),
			sixteenBreak: $("#sixteenBreak").val(),
			changed: $("#changed").val(),
			remark: $("#remark").val(),
		};
		console.log("修改实习params:"+ JSON.stringify(params));
		oDataSource.changeStudnetPractice(params)
		.done(function(res){
			// console.log(res);
			swal({
				title: "提交成功",
				type: "success"
			});
			getPracticeInfo();
			$("#practiceModal").modal('toggle');
		})
		.fail(function(err){
			console.log(err);
		})
	}
})