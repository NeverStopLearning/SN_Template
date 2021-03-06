import React/*, { Component }*/ from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';



const TextAreaFieldGroup = ({
	//when using a functional based component that accepts properties
	name,
	placeholder,
	value,
	error,
	info,
	onChange
	
}) => {
		return(
				<div className="form-group">
	              <textarea className={cn('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} name={name} value={value} onChange={onChange} />
	              {info && (<small className= 'form-text text-muted'>{info}</small>)}
	              {error && (<div className= 'invalid-feedback'>{error}</div>)}
	            </div>
		)
};


TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,	
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired
};


export default TextAreaFieldGroup;