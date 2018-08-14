$(function(){

	var allStudentData = []; // 所有学生的信息

	var oDataSource = {
		/*
		* 获取所有学生的实习信息
		*/
		teacherPractice: function(oData){
			return $.ajax({
				url: Site("teacher.practices"),
				type: "post",
				data: oData
			})
		},
	}

	getPracticesInfo();
	
	// 请求所有学生信息信息
	function getPracticesInfo(){
		var params = {
			teacher_name: "周天凤"
		}
		// console.log("老师:"+ JSON.stringify(params));
		oDataSource.teacherPractice(params)
		.done(function(res){
			// console.log(res);
			allStudentData = res.data;
			$.each(res.data, function(i, item){
				$("#studentsBox").append(practiceTemp(i,item));
			})
			clickStudentName();
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 学生名单
	function practiceTemp(i, item){
		return (
			"<p class='list-group-item' style='cursor: pointer' id='"+
				item.student_id+"'><span>"+(i+1)+"</span>&nbsp;&nbsp;" + item.student_name + 
				'&nbsp;&nbsp;'+item.class_name+
				"班</p>"
		)
	}

	// 点击学生名单，进入模态框详情页
	function clickStudentName(){
		$("#studentsBox > p").click(function(e){
			$("#detailPracticeModal").modal("toggle");
			var id = $(this).attr("id");
			var temp = "";
			$.each(allStudentData, function(i, item){
				if(item.student_id ==id){
					temp = item;
				}
			});
			detailStudentPractice(temp);
		})
	}

	// 学生实习信息填写到模态框
	function detailStudentPractice(item){
		$("#student_name").html(item.student_name);
		$("#student_class").html(item.class_name);
		$("#student_tel").html(item.student_tel);
		$("#teacher_name").html(item.teacher_name);
		$("#teacher_tel").html(item.teacher_tel);
		$("#practice_company").html(item.practice_company);
		$("#post").html(item.post);
		$("#practice_time").html(item.practice_time);
		$("#practice_long").html(item.practice_long);
		$("#practice_type").html(item.practice_type);
		$("#relation_name").html(item.relation_name);
		$("#relation_tel").html(item.relation_tel);
		$("#arrange").html(item.arrange);
		$("#company_taken").html(item.company_taken);
		$("#tenBreak").html(item.tenBreak);
		$("#sixteenBreak").html(item.sixteenBreak);
		$("#changed").html(item.changed);
		$("#remark").html(item.remark);
	}
})