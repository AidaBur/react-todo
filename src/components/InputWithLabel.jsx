import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      <input 
        id={props.id} 
        type="text" 
        value={props.value} 
        onChange={props.onChange} 
        ref={inputRef} 
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};


export default InputWithLabel;
