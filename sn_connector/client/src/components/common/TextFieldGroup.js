import React/*, { Component }*/ from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';



const TextFieldGroup = ({
	//when using a functional based component that accepts properties
	name,
	placeholder,
	value,
	label,//TODO add this to input
	error,
	info,
	type,
	onChange,
	disabled
	
}) => {
		return(
				<div className="form-group">
	              <input type={type} className={cn('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled} />
	              {info && (<small className= 'form-text text-muted'>{info}</small>)}
	              {error && (<div className= 'invalid-feedback'>{error}</div>)}
	            </div>
		)
};


TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,	
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	label: PropTypes.string, //not used though
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};


TextFieldGroup.defaultProps = {
	type: 'text'	
};

export default TextFieldGroup;