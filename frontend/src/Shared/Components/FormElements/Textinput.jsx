import React, { useEffect, useReducer } from "react";
import { validate } from "../util/validate";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const TextInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const {id, onInput} = props;
  const {value, isValid} = inputState;

  useEffect(() => {
  onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "Input" ? (
      <input class={props.class}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea class={props.class}
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <>
  <div
    className={props.divClass && `${props.divClass}`+ ` form-control ${
      !inputState.isValid && inputState.isTouched && "form-control--invalid"
    }`}
  >
    <label className={props.divLabel} htmlFor={props.id}>{props.label}</label>
    <textarea
      id={props.id}
      className="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
      placeholder={props.placeholder}
      value={inputState.value}
      onChange={changeHandler}
      onBlur={touchHandler}
    />
    {!inputState.isValid && inputState.isTouched && (
      <p className="text-red-800">{props.errorText}</p>
    )}
  </div>
</>

  );
};

export default TextInput;
