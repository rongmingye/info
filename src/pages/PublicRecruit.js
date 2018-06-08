import React from 'react';

import Title from '../components/Title';
import Side from '../components/Side';
import Foot from '../components/Foot';

import  './css/publicRecruit.css';

// 查看招聘信息
class PublicRecruit extends React.Component{

	// 检验表单
	checkForm(e){
		
		if(this.refs.company.value===""){
			e.preventDefault(); // 阻止默认行为
			alert("请输入公司名称");
			this.refs.company.focus();
			return false;
		}
		if(this.refs.address.value===""){
			e.preventDefault(); // 阻止默认行为
			alert("请输入公司地址");
			this.refs.address.focus();
			return false;
		}
		if(this.refs.post.value===""){
			e.preventDefault(); // 阻止默认行为
			alert("请输入职位");
			this.refs.post.focus();
			return false;
		}
		if(this.refs.required.value===""){
			e.preventDefault(); // 阻止默认行为
			alert("请输入要求");
			this.refs.require.focus();
			return false;
		}
		if(this.refs.salary.value===""){
			e.preventDefault(); // 阻止默认行为
			alert("请输入工资");
			this.refs.require.focus();
			return false;
		}
		if(this.refs.relation.value===""){
			e.preventDefault(); // 阻止默认行为
			alert('请输入联系人和联系人电话')
			this.refs.relation.focus();
			return false;
		}
		
		return true;
	}

	render(){
			
		return(
			<div className="page publicRecruit">
			    <Title />
				<div className="main clearfix">
					<div className="side f-left">
						<Side /> 
					</div>
					<div className="show f-right">
					 	<form action="/publicRecruit" method="post" name="publicRecruitForm"
							onSubmit={(e)=>{return this.checkForm(e);}} >
							<p className="changeLine">
								<span></span>
								<input type="submit" value="发布" className="queryBtn"/>
								<input type="button" value="取消发布"  className="canselBtn" 
								onClick={()=>{this.props.history.goBack();}}/>
							</p>
							<p className="tip">注: 带'*'为必需要填写的</p>
							<p>
								<span>*公司：</span>
								<input type="text" ref="company" name="company" />
							</p>
							<p>
								<span>*地址：</span>
								<input type="text" ref="address" name="address" />
							</p>
							<p>
								<span>*职位：</span>
								<input type="text" ref="post"  name="post" />
							</p>
							<p>
								<span>*要求：</span>
								<textarea ref="required" name="required" style={{"width":"80%", "height":"300px"}}></textarea>
							</p>
							<p>
								<span>*工资：</span>
								<input  type="text" ref="salary" name="salary" />
							</p>
							<p>
								<span>*吃住：</span>
								<input  type="text" ref="eatLive" name="eatLive" />
							</p>
							<p>
								<span>*联系人：</span>
								<input  type="text" ref="relation" name="relation" />
							</p>
							
						</form>
					</div>
				</div>
				<Foot />
			</div>	
		)
	}
}

export default  PublicRecruit;