import React from 'react';


/* Used for DUMB components - components that never have state and use no life cycle methods.  */
export default () => {
		return(
				<div>
				
				</div>
		)
}






/*import React from 'react';


 Used for DUMB components - components that never have state and use no life cycle methods.  
export default () => {
//	render(){ No render() in this creation method
		return(
				<div>
				
				</div>
		)
//	}
}*/

// or

/*
//This might work. Need to test it out

const componentName = () = > {
//	render(){ No render() in this creation method
		return(
				<div>
				
				</div>
		)
//	}
}

export default varName;



import React, { Component } from 'react';


const TextFieldGroup = () => {
		return(
				<div>
				
				</div>
		)
}

export default TextFieldGroup;




const TextFieldGroup = ({
	//when using a functional based component that accepts properties
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
	
}) => {
		return(
				<div>
				
				</div>
		)
}

export default TextFieldGroup;

*/