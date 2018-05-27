import { combineReducers } from 'redux';

// 老师的学生们信息
const studentsInfo = (state=[], action) => {
	switch(action.type){
		case "GET_STUDENTSINFO": state = action.val; return state;
		default: return state;
	}
}

// 学生的信息
const studentInfo = (state="", action) => {
	switch(action.type){
		case "GET_STUDENTINFO": state = action.val; return state;
		default: return state;
	}
}

// 侧边的信息
const sideInfo = (state="", action) => {
	switch(action.type){
		case "GET_SIDE_INFO": state = action.val; return state;
		default: return state;
	}
}

// 目标学生的信息
const targetStudentInfo = (state="", action) => {
	switch(action.type){
		case "GET_TARGET_STUDENT_INFO": state = action.val; return state;
		default: return state;
	}
}

const reducers = combineReducers({
	studentsInfo,
	studentInfo,
	sideInfo,
	targetStudentInfo,
});

export default reducers;