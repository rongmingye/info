import React from "react";
import  $ from "jquery"
import './css/login.css';

class Login extends React.Component{

	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			userType: "student" 
		}
	}

	// 登陆处理
	// 根据userType跳转到student/teacher页面
	// 保存uesrType username isLogin到sessionStorage
	loginHandle(username, pwd){
		$.ajax({
			url: "/login",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charser=utf-8",
			data: "username="+ username + "&pwd="+pwd + "&userType="+this.state.userType,
			dataType: "text",
			success: function(result){
				if(result === "success"){
					var myStorage = window.sessionStorage;
					myStorage.setItem("isLogin", true);
					if(this.state.userType === "student"){
						myStorage.setItem("username", username);
						myStorage.setItem("userType", "student");
						this.props.history.push("/student"); 
					
					}else if(this.state.userType === "teacher"){
						myStorage.setItem("username", username);
						myStorage.setItem("userType", "teacher");
						this.props.history.push("/teacher");
					}
				}else if(result==="fail"){
					alert("密码错误");
				}
			}.bind(this),
			fail: function(err, status){
				console.log(err);
			}
		});
	}

	// 处理单选框 teacher/student
	handleChange(event){
		this.setState({
			userType: event.target.value
		});
	}
	
	render(){
		return (
			<div className="page login-page">
				<div className="login">
					<h3>用户登陆</h3>
					<p>
			         	<span className="username">用户名:</span> 
			          	<input type="text" name="username" id="username" ref="username" />
			      	</p>
			  		<p>
			          	<span>密码:</span>
			          	<input type="password" name="pwd" id="pwd" ref="pwd" />
			      	</p>
			      	<p>
			      		<span></span>
			      		<input type="radio" name="userType" value="teacher" onChange={this.handleChange} /> 老师
			      		<input type="radio" name="userType" value="student" checked onChange={this.handleChange} /> 学生
			      	</p>
			  		<p> 
			  			<span></span>
			          	<input type="button" value="登录" id="loginBtn" onClick={ ()=>{
			          		let username = this.refs.username.value;
			          		let pwd = this.refs.pwd.value;
			          		this.loginHandle(username, pwd);
			          	}}/>
					</p>
				</div>	     	
			</div>
		);
	}
}

export default Login;
