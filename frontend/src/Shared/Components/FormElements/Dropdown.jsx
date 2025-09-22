import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const { initialValue } = props;
  const [value, setValue] = useState("");
  const [isValid, setisValid] = useState(props.initialValid || false);

  const changeHandler = (event) => {
    console.log(event.target.value);
    if(event.target.value === "...."){
      setisValid(false)
    }else{
    setValue(event.target.value);
    setisValid(true)}
  };

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <>
      
        <label htmlFor={props.id} >{props.label}</label>&emsp;
        <select id={props.id} onChange={changeHandler} class={props.class}>
          {props.options.map((option) => {
            if (option.value === initialValue) {
              return <option selected >{option.value}</option>;
            } else {
              return <option>{option.value}</option>;
            }
          })}
        </select>
      
    </>
  );
};

export default Dropdown;
