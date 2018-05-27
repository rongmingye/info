import React from "react";
import { connect } from "react-redux";
import { getStudentInfo }  from "../reducers/action";
import $ from 'jquery';
import 'jquery.cookie';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/page.css';
import './css/revise.css';

class Revise extends React.Component{

	constructor(){
		super();
		this.state = {
			studentName: null,
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
			});
		}
	}

	// 加载页面
	componentDidMount(){
		this.getStudentInfo();
	}

	//获取该学生的信息
	getStudentInfo(){

		$.ajax({
			url: "/getStudentInfo",
			type: "post",
			contentType: "application/x-www-form-urlencoded; charser=utf-8",
			data: "student_name=" + this.state.studentName,
			success: function(result){
				this.props.getStudentInfo(result);
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	}

	// 提交修改信息
	handleSubmit(){
		if(window.confirm("确定提交修改！") ){
			$.ajax({
				url: "/reviseStudentInfo",
				type: "post",
				contentType: "application/json;charser=utf-8",
				data: JSON.stringify({
					'studentName': this.state.studentName,
					'teacher_name': this.refs.teacher_name.value,
					'teacher_tel': this.refs.teacher_tel.value,
					'practice_company': this.refs.practice_company.value,
					'practice_time': this.refs.practice_time.value,
					'practice_long': this.refs.practice_long.value,
					'practice_type': this.refs.practice_type.value,
					'post': this.refs.post.value,
					'relation_name': this.refs.relation_name.value,
					'relation_tel':  this.refs.relation_tel.value,
					'arrange': this.refs.arrange.value,
					'company_taken': this.refs.company_taken.value,
					'tenBreak': this.refs.tenBreak.value,
					'sixteenBreak': this.refs.sixteenBreak.value,
					'changed': this.refs.changed.value,
					'remark': this.refs.remark.value
				}),
				success: function(result){
					this.props.history.push("/student", {
						studentName:this.state.studentName,
						userType:this.state.userType,
					}); 
				}.bind(this),
				fail: function(err){
					console.log(err);
				}
			});
		}
	}

	canselRevise(){
		this.props.history.goBack();
	}
	
	render(){
		var item = this.props.studentInfo; // 学生的信息
		var content = null;
		if(item){
			content = 
				<div>
					<div className="changeLine">
						<input type="button" value="确定修改" 
						onClick={()=> {this.handleSubmit() }} className="queryBtn" />
						<input type="button" value="取消" 
						onClick={()=>{ this.canselRevise() }} className="canselBtn" />
					</div>
					<p className="tip">注: 带'*'为必需要填写的</p>
					<p>
						<span>*指导老师：</span> 
						<input type="text" ref="teacher_name" defaultValue={item.teacher_name} />
					</p>
					<p>
						<span>*指导老师电话：</span>
						<input type="text" ref="teacher_tel" defaultValue={item.teacher_tel} />
					</p>
					<p>
						<span>*实习公司：</span> 
						<input type="text" ref="practice_company" defaultValue={item.practice_company} />
					</p>
					<p>
						<span>*实习岗位：</span>
						 <input type="text" ref="post" defaultValue={item.post} />
					</p>
					<p>
						<span>*实习时间：</span>
						<input type="text" ref="practice_time" defaultValue={item.practice_time} />
					 </p>
					<p>
						<span>*实习多久：</span> 
						<input type="text" ref="practice_long" defaultValue={item.practice_long} />
					</p>
					<p>
						<span>*安排形式：</span> 
						<input type="text" ref="practice_type"  defaultValue={item.practice_type} />
					</p>

					
					<p>
						<span>*实习公司联系人：</span> 
						<input type="text" ref="relation_name"  defaultValue={item.relation_name}/>
					</p>
					<p>
						<span>*实习公司联系人电话：</span>
						<input type="text" ref="relation_tel" defaultValue={item.relation_tel} />
					</p>
					<p>
						<span>*安排形式：</span> 
						<input type="text" ref="arrange" defaultValue={item.arrange} />
					</p>
					
					<p>
						<span>*企业是否录用：</span> 
						<input type="text" ref="company_taken" defaultValue={item.company_taken} />
					</p>
					<p>
						<span>*是否突破《规定》第十条要求：</span>
					 	<input type="text" ref="tenBreak" defaultValue={item.tenBreak} />
					 </p>
					<p>
						<span>*是否突破《规定》第十六条要求，突破内容：</span> 
						<input type="text" ref="sixteenBreak" defaultValue={item.sixteenBreak} />
					</p>
					<p>
						<span>工作变动记录：</span> 
						<input type="text" ref="changed" defaultValue={item.changed} />
					</p>
					<p>
						<span>备注：</span> 
						<input type="text" ref="remark"  defaultValue={item.remark} />
					</p>
					
				</div>;
		}

		return (
			<div className="page revise">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left">
						<Side username={this.state.studentName}
						 	userType={ this.state.userType } /> 
					</div>
					<div className="show f-right">
							{content}
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

export default connect(mapStateToProps, mapDiapatchToPorps)(Revise);