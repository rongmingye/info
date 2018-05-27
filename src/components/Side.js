import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSideInfo }  from "../reducers/action";
import $ from 'jquery';

import './css/side.css';


// 用户信息
class Side extends React.Component{

	componentDidMount(){
		this.getSideInfoHandle();
	}

	// 获取侧边的信息
	getSideInfoHandle(){
		$.ajax({
			url: "/getSideInfo",
			type: "post",
			contentType: "application/json;charser=utf-8",
			data: JSON.stringify({
				'userType': this.props.userType,
				'username': this.props.username
			}),
			success: function(result){
				this.props.getSideInfo(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	render(){
		var item = this.props.sideInfo;
		var sideDiv; // 显示侧边的内容的容器
		if(this.props.userType === "student"){
			sideDiv = <div>
						<p><span>学号：</span> {item.student_id}</p>
						<p><span>姓名：</span> {item.student_name}</p>
						<p><span>专业：</span> {item.profession}</p>
						<p><span>学校：</span> {item.school}</p>
						<p><span>年级：</span> {item.grade}</p>
						<p>
							<Link to="/" className="logout"><span>注销</span></Link>
							<Link to={{
								pathname: "/modifyPwd",
								state: { 
									 userType: this.props.userType,
									 username: this.props.username,
								}
							}} className="modifyPwd"><span>修改密码</span></Link>
						</p>
					</div>;
		}else if(this.props.userType === "teacher"){
			sideDiv = <div>
						<p><span>工号：</span> {item.teacher_id}</p>
						<p><span>老师：</span> {item.teacher_name}</p>
						<p><span>电话：</span> {item.teacher_tel}</p>
						<p>
							<Link to="/" className="logout" ><span>注销</span></Link>
							<Link to={{
								pathname: "/modifyPwd",
								state: { 
									 userType: this.props.userType,
									 username: this.props.username,
								}
							}} className="modifyPwd"><span>修改密码</span></Link>
						</p>
					</div>;
		}

		return (
			<div>
				{sideDiv}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sideInfo: state.sideInfo,
	}
}

const mapDispatchToPorps = (dispatch) => {
	return {
		getSideInfo: (val)=>{ dispatch(getSideInfo(val)); }
	}
}

export default connect(mapStateToProps, mapDispatchToPorps)(Side);

