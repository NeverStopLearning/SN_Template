import React, { Component } from 'react';


/* Used for DUMB components - components that never have state and use no life cycle methods.  */
export default () => {
//	render(){ No render() in this creation method
		return(
				<div>
				
				</div>
		)
//	}
}

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

*/