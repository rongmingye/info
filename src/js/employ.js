$(function(){
	var oDataSource = {

		/*
		* 获取招聘信息
		* params: {}
		*/
		employInfo: function(oData){
			return $.ajax({
				url: Site("employ.info"),
				type: "post",
				data: oData
			})
		}
	}

	employInfo();
	// 获取招聘信息
	function employInfo(){
		oDataSource.employInfo()
		.done(function(res){
			// console.log(res);
			$.each(res.data, function(i, item){
				$("#employBox").append(employTempl(item, i+1));
			})
			clickTitle();
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 一个招聘信息的html结构
	function employTempl(item, i){
		return (
				'<div class="oneRecruit">'+
					'<h4>'+i+'、'+item.company+'<span class="caret m-l-sm"></span></h4>'+
					'<div class="oneRecruitContent s">'+
						'<div><span> 公司：</span><p>' + item.company + '</p></div>'+
						'<div><span> 地址：</span><p>' + item.address + '</p></div>'+
						'<div><span>  职位：</span><p>' + item.post + '</p></div>'+
						'<div><span>  要求：</span><p>' + item.required + '</p></div>'+
						'<div><span>  工资：</span><p>' + item.salary + '</p></div>'+
						'<div><span>  吃住：</span><p>' + item.eatLive + '</p></div>'+
						'<div><span>  联系人：</span> <p>' + item.relation +'</p></div>'+
					'</div>'+	
				'</div>'
				)
	}

	// 点击标题会触发下拉
	function clickTitle(){
		$(".oneRecruitContent").hide();
		$("#employBox h4").on('click', function(e){
			var that = $(this).next();
			if(that.hasClass("s")){
				that.hide();
				that.removeClass("s");
			}else{
				that.show();
				that.addClass('s');
			}
		})
	}
})