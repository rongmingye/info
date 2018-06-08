import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSideInfo }  from "../reducers/action";
import $ from 'jquery';

import './css/side.css';

// 用户信息
class Side extends React.Component{

	constructor(){
		super();
		var myStorage = window.sessionStorage;
		this.state = {
			username: myStorage.getItem("username"),
			userType: myStorage.getItem("userType"),
		}
	}

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
				'userType': this.state.userType,
				'username': this.state.username
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
		var recruitDiv;
		if(this.state.userType === "student"){
			sideDiv = <div className="userInfo">
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
									 userType: this.state.userType,
									 username: this.state.username,
								}
							}} className="modifyPwd"><span>修改密码</span></Link>
						</p>
					</div>;
			recruitDiv = <div className="recruitDiv"><Link to="/recruit">查看招聘信息</Link></div>;

		}else if(this.state.userType === "teacher"){
			sideDiv = <div className="userInfo">
						<p><span>工号：</span> {item.teacher_id}</p>
						<p><span>老师：</span> {item.teacher_name}</p>
						<p><span>电话：</span> {item.teacher_tel}</p>
						<p>
							<Link to="/" className="logout" ><span>注销</span></Link>
							<Link to={{
								pathname: "/modifyPwd",
								state: { 
									 userType: this.state.userType,
									 username: this.state.username,
								}
							}} className="modifyPwd"><span>修改密码</span></Link>
						</p>
					</div>;
			recruitDiv = <div className="recruitDiv">
							<Link to="/recruit">查看招聘信息</Link>
							<Link to="/publicRecruit">发布招聘信息</Link>
						</div>
		}

		return (
			<div>
				{sideDiv}
				{recruitDiv}
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

