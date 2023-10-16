import cn from "classnames";
import { forwardRef } from "react";
var Panel = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={props.style}
      className={
        "bg-flat-500 invertScrollbars outline outline-4  outline-flat-200/10 rounded-3xl relative overflow-hidden w-full h-full md:p-4 p-2" +
        cn(props.classNames) +
        " " +
        (props.className || "")
      }
    >
      {props.children}
    </div>
  );
});

export default Panel;
