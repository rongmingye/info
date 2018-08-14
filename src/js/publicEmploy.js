$(function(){
	var oDataSource = {
		/*
		* 发布招聘
		* params: {company, address, post, required, salary, eatLive, relation}
		*/
		publicEmployInfo: function(oData){
			return $.ajax({
				url: Site("employ.publish"),
				type: "post",
				data: oData
			})
		}
	}

	// 点击保存，提交招聘信息
	$("#save").click(function(){
		var check = $("#publicEmployForm").validate();
        if (check.form() == false) {
            return;
        }
		var params = {
			company: $("#company").val(),
			address: $("#address").val(),
			post: $("#post").val(),
			required: $("#required").val(),
			salary: $("#salary").val(),
			eatLive: $("#eatLive").val(),
			relation: $("#relation").val()
		}
		oDataSource.publicEmployInfo(params)
		.done(function(res){
			swal({
				title: "发布招聘成功",
				type: "success"
			}, function(){
				window.location = '#/employ.html';
			});	
		})
		.fail(function(err){
			console.log(err);
		})
	})

	//  表单验证
	$("#publicEmployForm").validate({
		rules: {
			company: "required",
			address: "required",
			post:  "required",
			required: "required",
			salary: "required",
			eatLive: "required",
			relation: "required"
		},
		messages: {
			company: "请输入公司名",
			address: "请输入公司的地址",
			post:  "请输入岗位",
			required: "请输入要求",
			salary: "请输入工资",
			eatLive: "请输入吃住情况",
			relation: "请输入联系人及其联系方式"
		},
		errorElement: "span",
        errorClass: "text-danger",
        errorPlacement: function($error, $control){
            $("#errorMsg").html($error);
        }
	});
	
})