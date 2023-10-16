import cn from "classnames";
import { useEffect, useState } from "react";

export default function Overlay({
  classNames = {},
  isVisible = true,
  className = "",
  onClick = () => {},
  children = null,
}: {
  classNames?: Record<string, boolean>;
  isVisible?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode | null | undefined;
}) {
  let [isRendered, setIsRendered] = useState(isVisible);

  let [timer, setTimer] = useState(null);

  useEffect(() => {
    timer && clearTimeout(timer);
    if (isVisible) {
      setIsRendered(true);
    } else {
      let set_timer = setTimeout(() => {
        setIsRendered(false);
        setTimer(null);
      }, 500);
      setTimer(set_timer);
    }
  }, [isVisible]);

  if (!isRendered) return null;

  return (
    <div
      onClick={onClick}
      key="overlay"
      className={
        "z-10 w-full h-full absolute top-0 left-0 transition-all flex items-center content-center justify-center " +
        cn(
          Object.assign(
            {
              "bg-flat-500": true,
              "opacity-0": !isVisible,
              "opacity-100": isVisible,
            },
            classNames
          )
        ) +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
