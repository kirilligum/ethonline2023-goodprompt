import cn from "classnames";
import { forwardRef } from "react";
var Panel = forwardRef(({ className, children, style = {} }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(className, "bg-flat-500 invertScrollbars outline outline-4 rounded-3xl relative overflow-hidden md:p-4 p-2")}
    >
      {children}
    </div>
  );
});

export default Panel;
