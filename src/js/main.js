
/**
 *主页
 *  @author rmy
 */

$(function () {
   
    shouldShow();
    // 一些需要隐藏的页面链接
    function shouldShow(){
       var userType = sessionStorage.getItem("userType");
       if(userType=="teacher"){
            $("#linkStudentPractice").hide();
       }else if(userType == "student"){
            $("#linkTeacherPractice").hide();
            $("#linkPublicEmploy").hide();
       }
    }

    var oDataSource = {
        /*
        * 获取用户信息
        * params: {username, userType}
        */
    	getUserInfo: function(oData){
    		return $.ajax({
    			url: Site("user.info"),
    			type: "post",
    			data: oData,
    		})
    	},

        /*
        * 改变用户信息
        * params: { username, userType, tel}
        */
        changeInfo: function(oData){
            return $.ajax({
                url: Site("user.changeInfo"),
                type: "post",
                data: oData,
            })
        },
    }

    showUserInfo();
    //获取用户信息
    function showUserInfo(){
    	var userType = sessionStorage.getItem("userType");
    	var params = {
    		username: sessionStorage.getItem("username"),
    		userType:  userType,
    	};
        // console.log("用户params:"+JSON.stringify(params));
    	oDataSource.getUserInfo(params)
    	.done(function(res){
    		// console.log(res);
    		if(userType=="student"){
    			studentUser(res);
                var studentClass = res.data.class_name;
                studentClass = studentClass.slice(4,6)+studentClass.slice(8,10);
                sessionStorage.setItem("studentClass", studentClass);
    		}else{
    			teacherUser(res);
    		}
    	})
    	.fail(function(){
            console.log(err);
    	})
    }

    // 填写学生用户信息
    function studentUser(item){
        $("#student_name").html(item.data.student_name);
    	$("#student_tel").html(item.data.student_tel);
    	$("#student_id").html(item.data.student_id);
    	$("#profession").html(item.data.profession);
    	$("#school").html(item.data.school);
    	$("#grade").html(item.data.grade);

        $("#userTel").val(item.data.student_tel);
        submitChangeInfo();
    }

    // 填写老师用户的信息
    function teacherUser(item){
    	$("#userInfoDropdown").html(
			'<li><a href="javascript:;">'+
					'<i class="fa fa-user"></i> 用户名'+
					'<span class="pull-right small" id="teacher_name">' + item.data.teacher_name + '</span>'+
			'</a></li>'+
			'<li class="divider"></li>'+
			'<li><a href="javascript:;">'+
					'<i class="fa fa-user"></i> 工号'+
					'<span class="pull-right small" id="teacher_id">'+item.data.teacher_id+'</span>'+
				'</a></li>'+
			'<li><a href="javascript:;">'+
					'<i class="fa fa-phone"></i> 电话'+
					'<span class="pull-right small" id="teacher_tel">'+item.data.teacher_tel+'</span>'+
			'</a></li><li class="divider"></li>'+
            '<li>'+
                '<div class="text-center link-block">'+
                    '<a class="J_menuItem" href="repassword.html" id="linkToRepass">'+
                        '<strong><i class="fa fa-expeditedssl"></i> 修改密码 </strong> <i class="fa fa-angle-double-right inoc"></i>'+
                    '</a>'+
                    '<a  data-toggle="modal" data-target="#changeInfoModal">'+
                        '<strong><i class="fa fa-expeditedssl"></i> 修改电话 </strong> <i class="fa fa-angle-double-right inoc"></i>'+
                    '</a>'+
                '</div>'+
            '</li>'
    	);
        $("#userTel").val(item.data.teacher_tel);
        submitChangeInfo();
    }

    // 提交用户修改的信息
    function submitChangeInfo(){
        $("#save").click(function(){
            var params = {
                username: sessionStorage.getItem("username"),
                userType: sessionStorage.getItem("userType"),
                tel: $("#userTel").val()
            }
            // console.log("修改用户信息params:"+JSON.stringify(params));
            oDataSource.changeInfo(params)
            .done(function(res){
                // console.log(res);
                swal({
                    title: "修改成功",
                    type: "success"
                })
                $("#changeInfoModal").modal("toggle");
                showUserInfo();
            })
            .fail(function(err){
                console.log(err);
            })
        })
    }

  	// 退出按钮
    $('#exit').on('click', function () {
        swal({
            title: "确定退出系统",
            // text: "确定退出系统？",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "确定",
            closeOnConfirm: false,
            confirmButtonColor: "#118bd8",
            cancelButtonText: "取消",
        }, function (button) {
            if (button) {
                sessionStorage.clear();
                location = 'login.html';
            }
        });
    });

    //菜单点击
    //function clickItem(){
        // $(".J_menuItem").on('click',function(){
        //     var url = $(this).attr('href');
        //     $("#J_iframe").attr('src',url);
        //     return false;
        // })
        // 点击用户的修改密码，触发下拉
        // $("#linkToRepass").on('click', function(){
        //     $("#userInfoDropdown").dropdown("toggle");
        //      return false;
        // });
    //}

});