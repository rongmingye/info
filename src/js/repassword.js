$(function(){
	var oDataSource = {
		/*
		* 提交修改密码
		*/
		changePassword: function(oData){
			return $.ajax({
				url: Site("user.repassword"),
				type: "post",
				data: oData
			})
		}
	}

	// 点击保存，修改密码
	$("#save").click(function(){
		var check = $("#changePasswordForm").validate();
        if (check.form() == false) {
            return;
        }
		var params = {
			username: sessionStorage.getItem("username"),
			userType: sessionStorage.getItem("userType"),
			oldPwd: $("#oldPassword").val(),
			newPwd: $("#newPassword").val(),
		}
		oDataSource.changePassword(params)
		.done(function(res){
			swal({
				title: "修改密码成功",
				type: "success"
			});
			$("#oldPassword").val('');
			$("#newPassword").val('');
			$("#againNewpasswork").val('');
		})
		.fail(function(){
			swal({
				title: "修改密码失败",
				type: "error"
			})
		})
	});

	// 表单验证
	$("#changePasswordForm").validate({
		rules: {
			oldPassword: "required",
			newPassword: "required",
			againNewpasswork: {
				required: true,
				equalTo: "#newPassword"
			}
		},
		messages: {
			oldPassword: "请输入旧密码",
			newPassword: "请输入新密码",
			againNewpasswork: {
				required: "请再次输入新密码",
				equalTo: "两次密码不一致"
			}
		},
		errorElement: "span",
        errorClass: "text-danger",
        errorPlacement: function($error, $control){
            $("#errorMsg").html($error);
        }
	})
})