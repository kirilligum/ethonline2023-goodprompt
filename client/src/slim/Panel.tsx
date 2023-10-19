import cn from "classnames";
import { forwardRef } from "react";
var Panel = forwardRef(({ className, children, style = {} }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(className, "outline outline-4 relative overflow-hidden md:p-4 p-2 rounded-none md:rounded-3xl")}
    >
      {children}
    </div>
  );
});

export default Panel;
