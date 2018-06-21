const isEmpty = (value) =>
			value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0);



export default isEmpty;
//module.exports = isEmpty;	
			
			
/*
 function isEmpty(value){
	return(
			value === undefinded ||
			value === null ||
			(typeof value === 'object' && Object.keys(value) === 0) ||
			(typeof value === 'string' && value.trim().length === 0)
	);
}*/
			
