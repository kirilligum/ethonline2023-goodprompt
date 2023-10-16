import { useEffect, useRef, useState } from "react";
import MultiButton from "./MultiButton";
import cn from "classnames";
// import { motion } from "framer-motion";

export default function InputButton(props) {
  let [is_focused, setFocused] = useState(false);
  let [hasValue, setHasValue] = useState(false);
  let input_ref = useRef(null);

  function onButtonClick() {
    input_ref.current.select();
    input_ref.current.focus();
  }

  function onButtonFocus() {
    input_ref.current.select();
    input_ref.current.focus();
  }

  useEffect(() => {
    if (props.inputRef && input_ref.current) {
      props.inputRef(input_ref.current);
    }
  }, [input_ref.current]);
  let new_props = { ...props };
  new_props.className = props.className || "";
  new_props.className += " " + (is_focused ? "ring-4" : "");
  new_props.onClick = onButtonClick;
  new_props.onFocus = onButtonFocus;

  let input_field = (
    <input
      autoComplete={props.autoComplete}
      name={props.name}
      required={props.required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      ref={input_ref}
      className={
        "w-full outline-none border-none bg-transparent " + props.inputClassName
      }
      type={props.type || "text"}
      placeholder={props.placeholder}
      onChange={(e) => {
        if (e.target.value && !hasValue) {
          setHasValue(true);
        } else if (!e.target.value && hasValue) {
          setHasValue(false);
        }
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      value={props.value}
    ></input>
  );

  let content = null;
  if (props.label) {
    content = (
      <div className="flex flex-col w-full">
        <div
          className={
            "text-sm flex items-start transition-opacity " +
            cn({ "opacity-50": hasValue })
          }
        >
          {props.label}
        </div>
        <div className="flex items-center">
          {props.pre}
          {input_field}
        </div>
      </div>
    );
  } else {
    content = input_field;
  }
  return (
    <MultiButton {...new_props} skipFocus={true}>
      {content}
    </MultiButton>
  );
}
