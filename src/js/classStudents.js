$(function(){
	var className = GetQueryString("className");

	var oDataSource = {
		/*
		* 获取班级学生信息
		* params: {className}
		*/
		getClassStudents: function(oData){
			return $.ajax({
				url: Site("school.classStudents"),
				type: "post",
				data: oData
			})
		}
	}

	 showClassStudents();
	// 获取新闻
	function showClassStudents(){
		$("#classTitle").html("本科"+className+"名单");
		var params = {
			className: "本科"+className
		};
		console.log("className params:" + JSON.stringify(params));
		oDataSource.getClassStudents(params)
		.done(function(res){
			console.log(res);
			$.each(res.data, function(i, item){
				$("#studentsBox").append(studentTempl(item));
			})
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 每个学生的html结构
	function studentTempl(item){
		return (
			"<p class='list-group-item clearfix'>" +
				"<span class='col-sm-2'>"+item.student_name+"</span>"+
				"<span class='col-sm-2'>"+item.student_id+"</span>"+
				"<span class='col-sm-2'>"+item.class_name+"</span>"+
				"<span class='col-sm-2'>"+item.student_tel+"</span></p>"
		);
	}

		// 获取url参数
	function GetQueryString(name){
     	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     	var r = window.location.search.substr(1).match(reg);
     	if(r!=null)return  unescape(r[2]); return null;
	}

 // 	$("#table").bootstrapTable({
 //        data: [],
 //        url: Site("school.classStudents"),
 //        contentType: "application/x-www-form-urlencoded",
 //        sidePagination: "server",
 //        striped: true,
 //        pagination: true,
 //        pageSize: 100,
 //        pageNumber: 1,
 //        pageList: [10,20,30,50,100],
 //        toolbar: "#toolbar",
 //        queryParams: queryParams,
 //        responseHandler: responseHandler,
 //        columns: [
 //            {field: "student_name", title: "学生名字", align: "center"},
 //            {field: "class_name", title: "学生班级", align: "center"},
 //            {field: "student_tel", title: "电话", align: "center"},
 //        ]
 //    });

	// function queryParams(params) {
 //        var send = {
 //        	className: "本科"+className,
 //            pageNo: parseInt(params.offset / params.limit) + 1,
 //            pageSize: params.limit,
 //        };
 //      	console.log(send);
 //        return JSON.stringify(send);
	// }

	// function responseHandler(res) {
	// 	console.log("---",res);
 //        if(res.data.length > 0) {
 //            var total = res.data.length;
 //            return {rows: res.data, total: total};
 //        }
 //        return {rows: [], total: 0};
 //    }
})