import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import 'jquery.cookie';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';
import { getStudentsInfo }  from "../reducers/action";
import { getTargetStudentInfo }  from "../reducers/action";
import { Link }  from "react-router-dom";


import './css/page.css';
import './css/teacher.css';

class Teacher extends React.Component{

	constructor(){
		super();
		this.state = {
			teacherName: null,
			userType: null,
		}
	}

	//获取history.location的state数据
	componentWillMount(){
		var isLogin = $.cookie("isLogin");
		var locationState = this.props.history.location.state;
		if(!isLogin || !locationState){
			this.props.history.replace("/"); // 没有登陆过就返回login页面
		}else{
			this.setState({
				teacherName: locationState.teacherName,
				userType: locationState.userType,
			});
		}
	}

	// 加载页面
	// 获取老师的学生们的信息，保存studentsInfo到store
	componentDidMount(){
		this.getStudentsInfo();
	}

	// 获取该老师的学生们信息，根据state.teacherName
	// 保存学生信息到store.studentsInfo
	getStudentsInfo(){
		$.ajax({
			url: "/getStudentsInfo",
			type: "post",
			contentType: "application/x-www-form-urlencoded;charser=utf-8",
			data: "teacher_name=" + this.state.teacherName,
			success: function(result){
				this.props.getStudentsInfo(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	// 先改变目标学生store.targetStudent，让页面更顺畅
	handleClick(val){
		this.props.getTargetStudentInfo(val);
	}

	render(){
		var items = this.props.studentsInfo; // 学生们的信息
		var studentsName = items.map((item, i)=>{
			let count = 0;
	
	     	if(item.teacher_name){ count++; }
			if(item.teacher_tel){ count++; }
			if(item.practice_company){ count++; }
			if(item.post){ count++; }
			if(item.practice_time){ count++; }
			if(item.practice_long){ count++; }
			if(item.practice_type){ count++; }
			if(item.relation_name){ count++; }
			if(item.relation_tel){ count++; }
			if(item.arrange){ count++; }
			if(item.company_taken){ count++; }
			if(item.tenBreak){ count++; }
			if(item.sixteenBreak){ count++; }

			let progress = {
				width: parseInt(count/13*100, 10)+"%",
			}

			return <Link to={{
							pathname: "/follow",
							state: { teacherName: this.state.teacherName,
								 userType:this.state.userType,
								 studentName: item.student_name}
						}} key={i}>
						<div className="lineRow" onClick={()=>{this.handleClick(item);}} > 
							<span>{item.student_name} </span>
							<div className="progress">
								<div className="bar" style={progress}>{progress.width}</div>
							</div>
						</div>
					</Link>;
		});

		return (
			<div className="page teacher">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left">
						<Side username={this.state.teacherName}
						 userType={this.state.userType} /> 
					</div>
					<div className="show f-right">
				 		<div>
							<h3 className="show-list-title">指导的学生名单 &nbsp;及其信息填写进度：</h3>
							{studentsName}	
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
		studentsInfo: state.studentsInfo,
	}
}

const mapDiapatchToPorps = (dispatch) => {
	return{
		getStudentsInfo: (val) => { dispatch(getStudentsInfo(val));},
		getTargetStudentInfo: (val) => { dispatch(getTargetStudentInfo(val)); }
	}
}

export default connect(mapStateToProps, mapDiapatchToPorps)(Teacher);