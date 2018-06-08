import React from "react";
import $ from 'jquery';
import 'jquery.cookie';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/modifyPwd.css';

class ModifyPwd extends React.Component{

	// 获取sessionStorage数据
	constructor(){
		super();
		var myStorage = window.sessionStorage;
		this.state = {
			username: myStorage.getItem("username"),
			userType: myStorage.getItem("userType"),
		}
	}

	// 获取history.location的state数据
	componentWillMount(){
		var isLogin = window.sessionStorage.getItem("isLogin");
		if(!isLogin){
			this.props.history.replace("/"); // 没有登陆过就返回login页面
		}
	}

	// 提交修改密码,
	// 先前端验证密码有没有输入和输入不一致
	// 再后台验证有没该密码, 有着更新密码，无就返回提示错误
	handleSubmit(){
		var oldPwd = this.refs.oldPwd.value;
		var newPwd1 = this.refs.newPwd1.value;
		var newPwd2 = this.refs.newPwd2.value;
		if(!oldPwd){
			alert("请填写旧密码！");
			return null;
		}else if(!newPwd1){
			alert("请填写新密码！");
			return null;
		}else if(!newPwd2){
			alert("请再次填写新密码！");
			return null;
		}

		if( newPwd1 !== newPwd2){
			alert("请两次新密码不一致！");
			return null;
		}

		if(window.confirm("确定提交修改！") ){
			$.ajax({
				url: "/modifyPwd",
				type: "post",
				contentType: "application/json;charser=utf-8",
				data: JSON.stringify({
					'oldPwd': oldPwd,
					'newPwd': newPwd1,
					'username': this.state.username,
					'userType': this.state.userType
				}),
				dataType: "text",
				success: function(result){
					if(result==="success"){
						alert("修改密码成功");
						if(this.state.userType==="student"){
							this.props.history.push("/student"); 
						}else if(this.state.userType==="teacher"){
							this.props.history.push("/teacher"); 
						}
					}else if(result === "fail"){
						alert("旧密码错误，请重新输入！");
					}
				}.bind(this),
				fail: function(err){
					console.log(err);
				}
			});
		}
	}

	// 取消修改
	canselRevise(){
		this.props.history.goBack();
	}
	
	render(){

		return (
			<div className="page modifyPwd">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left">
						<Side /> 
					</div>
					<div className="show f-right">

						<div className="changeLine">
							<input type="button" value="确定修改" 
							onClick={()=> {this.handleSubmit() }} className="queryBtn" />
							<input type="button" value="取消" 
							onClick={()=>{ this.canselRevise() }} className="canselBtn" />
						</div>
						<p className="tip">注: 带'*'为必需要填写的</p>
						<p>
							<span>*旧密码：</span> 
							<input type="password" ref="oldPwd" />
						</p>
						<p>
							<span>*新密码：</span>
							<input type="password" ref="newPwd1"/>
						</p>
						<p>
							<span>*再次填写新密码：</span>
							<input type="password" ref="newPwd2"/>
						</p>
					</div>
					
				</div>
				<Foot />
			</div>	
		);
	}
}

export default ModifyPwd;