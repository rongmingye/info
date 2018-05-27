import React from "react";
import $ from 'jquery';

class Title extends React.Component{

	handleOpen(){
		$.ajax({
			url: "/open_post",
			type: "post",
			contentType: "application/x-www-form-urlencoded;",
			data: null,
			dataType: 'text',
			success: function(result){
				alert("开门成功！");
			},
			fail: function(err){
				console.log(err);
			}
		});
	}

	render(){
		return (
			<div className="title">
				<h3>信息采集系统</h3>
			</div>
		);
	}
}

export default Title;