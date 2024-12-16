import React, { useRef, useEffect } from 'react';

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

export default InputWithLabel;
