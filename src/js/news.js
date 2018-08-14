$(function(){

	var oDataSource = {
		/*
		* 获取校园新闻
		* params: {}
		*/
		schoolNews: function(oData){
			return $.ajax({
				url: Site("school.news"),
				type: "post",
				data: oData
			})
		}
	}

	getShoolNews();
	// 获取新闻
	function getShoolNews(){
		oDataSource.schoolNews()
		.done(function(res){
			// console.log(res);
			$.each(res.data, function(i, item){
				$("#newsBox").append(newsTempl(item));
			})
		})
		.fail(function(err){
			console.log(err);
		})
	}

	// 每个新闻的html结构
	function newsTempl(item){
		return (
			"<a class='list-group-item clearfix' href='"+item.news_link+"' target='_blank'>" + item.news_title + "<span class='pull-right'>"+item.timer+"</span></a>"
		);
	}

})