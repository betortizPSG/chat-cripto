import React from "react";

export default function Input(props) {

  return (
    <div>
      <input
        type={props.type || "text"}
        name={props.name}
        value={props.value}
        className={props.className || "form-control"}
        placeholder={props.placeholder || "Digite algo ..."}
        autoComplete={props.autoComplete || "off"}
        { ...props }
      />
    </div>
  );
}
