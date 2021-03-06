import React/*, { Component }*/ from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';


//y not just add 'icon' to TextFieldGroup?
const InputGroup = ({
	name,
	placeholder,
	value,
	error,
	icon,
//	type,
	info,
	onChange
	
}) => {
		return(
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text">
							<i className={icon} />
						</span>
					</div>
				
				
				
	              <input className={cn('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} name={name} value={value} onChange={onChange} />
	              {info && (<small className= 'form-text text-muted'>{info}</small>)}
	              {error && (<div className= 'invalid-feedback'>{error}</div>)}
	            </div>
		)
};


InputGroup.propTypes = {
	name: PropTypes.string.isRequired,	
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	error: PropTypes.string,
//	type: PropTypes.string.isRequired,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired
};


//InputGroup.defaultProps ={
//	type:'text';	
//};



export default InputGroup;