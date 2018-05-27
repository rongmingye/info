export const getStudentsInfo = (val) =>{
	return{
		type: "GET_STUDENTSINFO",
		val: val
	}
}

export const getStudentInfo = (val) =>{
	return{
		type: "GET_STUDENTINFO",
		val: val
	}
}

export const getSideInfo = (val) =>{
	return{
		type: "GET_SIDE_INFO",
		val: val
	}
}

export const getTargetStudentInfo = (val) =>{
	return{
		type: "GET_TARGET_STUDENT_INFO",
		val: val
	}
}