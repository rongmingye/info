import React from "react";
import { connect } from "react-redux";
import { getStudentInfo }  from "../reducers/action";
import { Link }  from "react-router-dom";
import $ from 'jquery';
import 'jquery.cookie';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/page.css';
import './css/student.css';

class Student extends React.Component{

	constructor(){
		super();
		this.state = {
			username: null,
			userType: null,
		}
	}

	// 获取history.location的state数据
	componentWillMount(){
		var isLogin = $.cookie("isLogin");
		var locationState = this.props.history.location.state;
		if(!isLogin || !locationState){
			this.props.history.replace("/"); // 没有登陆过就返回login页面
		}else{
			this.setState({
				studentName: locationState.studentName,
				userType: locationState.userType,
				login: locationState.login
			});
		}
	}

	// 加载页面
	componentDidMount(){
		this.getStudentInfo();
	}

	// 获取该学生的信息, 根据store.studentName
	// 保存该学生信息到store.studentInfo
	getStudentInfo(){
		$.ajax({
			url: "/getStudentInfo",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charser=utf-8",
			data: "student_name=" + this.state.studentName,
			success: function(result){
				this.props.getStudentInfo(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}
	
	render(){
		var item = this.props.studentInfo; // 学生的信息
		return (
			<div className="page student">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left">
						<Side username={this.state.studentName}
						 userType={ this.state.userType } /> 
					</div>
					<div className="show f-right">
					
						<Link to={{
								pathname: "/revise",
								state: { 
									studentName: this.state.studentName,
									userType:this.state.userType, 
								}
							}} className="reviseBtn">填写/修改</Link>

						<div>
							<p><span>指导老师：</span> {item.teacher_name}</p>
							<p><span>指导老师电话：</span> {item.teacher_tel}</p>
							<p><span>实习公司：</span> {item.practice_company}</p>
							<p><span>实习岗位：</span> {item.post}</p>
							<p><span>实习时间：</span> {item.practice_time}</p>
							<p><span>实习多久：</span> {item.practice_long}</p>
							<p><span>安排形式：</span> {item.practice_type}</p>
							
							<p><span>实习公司联系人：</span> {item.relation_name}</p>
							<p><span>实习公司联系人电话：</span> {item.relation_tel}</p>
							<p><span>安排形式：</span> {item.arrange}</p>
							
							<p><span>企业是否录用：</span> {item.company_taken}</p>
							<p><span>是否突破《规定》第十条要求：</span> {item.tenBreak}</p>
							<p><span>是否突破《规定》第十六条要求，突破内容：</span> {item.sixteenBreak}</p>
							<p><span>工作变动记录：</span> {item.changed}</p>
							<p><span>备注：</span> {item.remark}</p>
						</div>

					</div>
				</div>
				<Foot />
			</div>	
		);
	}
}

const mapStateToProps = (state) => {
	return {
		studentInfo: state.studentInfo,
	}
}

const mapDiapatchToPorps = (dispatch) => {
	return{
		getStudentInfo: (val) => { dispatch(getStudentInfo(val));}
	}
}

export default connect(mapStateToProps, mapDiapatchToPorps)(Student);