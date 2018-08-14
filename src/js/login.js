$(function () {

	var error = new Error();

    var oDataSource = {
        /**
         * 用户登陆
         * @param oData:"username","password, userType"
         * @return {Object} Deferred对象
         */
        login: function (oData) {
            return $.ajax({
                url: Site("user.login"),
                method: "post",
                data: oData
            });
        }
    };

	$('#loginform').validate({
		rules: {
			username: "required",
			password: "required"
		},
		messages: {
			username: {required:"账号或密码不能为空"},
			password: {required:"账号或密码不能为空"},
		},
		errorPlacement: function (error, element) {
			$("#error").html(error);
		},
		errorElement: "small",
		errorClass: 'text-danger',
		submitHandler: send
	});

	/*登录*/
	function send() {
		var $btnLogin = $('#loginform button[type="submit"]');
		if($btnLogin.hasClass('disabled')) {
			return;
		}
		$btnLogin.addClass('disabled');
        var username = $("#username").val();
        var password = $("#password").val();
        var userType = $("input[name='userType']:checked").val();

		var oParam = {
			username:username,
			password:password,
			userType:userType
		};
		// console.log("登陆param"+ JSON.stringify(oParam));
		var done = function(data){
			// console.log("data:",data)
			if(data.code == 0){
                $("#error").html("账号或密码错误，请重试！");
                $('#loginform button[type="submit"]').removeClass("disabled");
			}else if(data.code == 1){
				sessionStorage.setItem("username", data.result.username);
				sessionStorage.setItem("userType", data.result.userType);
                //如果需要每次登陆成功都加载首页, 下面一句则改成location = "main.html";
                location = "main.html" + location.hash;
			}
		};
		var failed = function(e){
			error.listen(e.state, "登录失败，请重试！");
		};

        oDataSource
			.login(oParam)
			.always(function(data) {
				$btnLogin.removeClass('disabled');
				return data;
			})
			.then(done,failed);
	}
});