import React from 'react';
import $ from 'jquery';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import './css/recruit.css';

// 查看招聘信息
class Recruit extends React.Component{

	constructor(){
		super();
		this.state = {
			recruitInfo: []
		}
	}

	// 请求招聘信息
	componentWillMount(){
		$.ajax({
			url: "/getRecruits",
			type: "post",
			contentType: "application/x-www-from-urlencoded;",
			dataType: "json",
			data: null,
			success: function(result){
				this.setState({
					recruitInfo: result
				});
			}.bind(this),
			fail: function(err){

			}
		});
	}

	render(){
		// 遍历招聘信息
		var recruitList = this.state.recruitInfo.map((item, i)=>{
			return(
			 		<div key={i} className="oneRecruit">
						<h3>{i+1}</h3>
						<div className="oneRecruitContent">
							<div><span> 公司：</span><p>{item.company} </p></div>
							<div><span> 地址：</span><p>{item.address} </p></div>
							<div><span>  职位：</span><p>{item.post} </p></div>
							<div><span>  要求：</span><p>{item.required}</p></div>
							<div><span>  工资：</span><p>{item.salary} </p></div>
							<div><span>  吃住：</span><p>{item.eatLive} </p></div>
							<div><span>  联系人：</span> <p>{item.relation}</p></div>
						</div>	
					</div>
			);
		});

		return(
				<div className="page recruit">
				    <Title />
					<div className="main clearfix">
						<div className="side f-left">
							<Side /> 
						</div>
						<div className="show f-right">
					 		<button onClick={()=>{this.props.history.goBack();}} className="queryBtn">返回</button>
							{recruitList}
							
						</div>
					</div>
					<Foot />
				</div>	
		);
	}
}

export default  Recruit;