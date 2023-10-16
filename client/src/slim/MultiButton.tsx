import cn from "classnames";
import { useEffect, useState, createElement } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";

let style_map = {
  "neutral-inv": {
    on: "hover:bg-flat-100 bg-neutral-900 hover:ring hover:ring-4 !ring-neutral-900",
    off: "hover:bg-flat-100 bg-neutral-900 hover:ring hover:ring-4 !ring-neutral-900",
  },

  "flat-inv": {
    on: "hover:bg-flat-900 bg-flat-800 text-flat-200 hover:ring hover:ring-4 !ring-flat-300",
    off: "hover:bg-flat-900 bg-flat-800 text-flat-200 hover:ring hover:ring-4 !ring-flat-300",
  },
  "flat-inv-shadow": {
    on: "hover:bg-flat-900 bg-flat-800 hover:ring hover:ring-4 !ring-flat-300 shadow-2xl shadow-flat-800",
    off: "hover:bg-flat-900 bg-flat-800 hover:ring hover:ring-4 !ring-flat-300 shadow-2xl shadow-flat-800",
  },
  flat: {
    on: "text-flat-900 bg-flat-200 hover:bg-flat-200 active:bg-flat-200 hover:ring hover:ring-4 !ring-flat-300",
    off: "text-flat-900 bg-flat-500 hover:bg-flat-300 active:bg-flat-200 hover:ring hover:ring-4 !ring-flat-300",
  },
  "flat-1": {
    on: "text-flat-900 bg-flat-200 hover:bg-flat-200 active:bg-flat-200  !ring-flat-600",
    off: "text-flat-900 bg-flat-400 hover:bg-flat-300 active:bg-flat-200  !ring-flat-600",
  },
  prime: {
    on: "text-white bg-prime-500 hover:bg-prime-400 active:bg-prime-400  ring-prime-200 ",
    off: "text-white bg-prime-500 hover:bg-prime-400 active:bg-prime-400 ring-prime-200 ",
  },
  "prime-shadow": {
    on: "text-white bg-prime-500 hover:bg-prime-400 active:bg-prime-400 ring-prime-300 shadow-2xl shadow-prime-500",
    off: "text-white bg-prime-500 hover:bg-prime-400 active:bg-prime-400 ring-prime-300 shadow-2xl shadow-prime-500",
  },
  sub: {
    on: "text-white bg-sub-500 hover:bg-sub-400 active:bg-sub-400 ring-sub-200",
    off: "text-white bg-sub-500 hover:bg-sub-400 active:bg-sub-400 ring-sub-200",
  },
  "sub-shadow": {
    on: "text-white bg-sub-500 hover:bg-sub-400 active:bg-sub-400 ring-sub-300 shadow-2xl shadow-sub-500",
    off: "text-white bg-sub-500 hover:bg-sub-400 active:bg-sub-400 ring-sub-300 shadow-2xl shadow-sub-500",
  },
  warn: {
    on: "text-white bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300 ring-yellow-200",
    off: "text-white bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300 ring-yellow-200",
  },
  danger: {
    on: "text-white bg-note-500 hover:bg-note-400 active:bg-note-300 ring-note-200",
    off: "text-white bg-note-500 hover:bg-note-400 active:bg-note-300 ring-note-200",
  },
  "danger-shadow": {
    on: "text-white bg-note-500 hover:bg-note-400 active:bg-note-300 ring-note-200 shadow-2xl shadow-note-500",
    off: "text-white bg-note-500 hover:bg-note-400 active:bg-note-300 ring-note-200 shadow-2xl shadow-note-500",
  },
  "slate-inv": {
    on: "text-white bg-slate-800 hover:bg-slate-900 active:bg-slate-900 !ring-slate-300 ",
    off: "text-white bg-slate-800 hover:bg-slate-900 active:bg-slate-900 !ring-slate-300 ",
  },
  slate: {
    on: "text-slate-900 bg-slate-300 hover:bg-slate-200 active:bg-slate-400 !ring-slate-300 ",
    off: "text-slate-900 bg-slate-300 hover:bg-slate-200 active:bg-slate-400 !ring-slate-300",
  },
  "violet-inv": {
    on: "text-violet-100 hover:bg-violet-900 bg-violet-800 ring-violet-300 hover:ring-4",
    off: "text-violet-100 hover:bg-violet-900 bg-violet-800 ring-violet-300 hover:ring-4",
  },
};

type StyleName =
  | "flat"
  | "prime"
  | "prime-shadow"
  | "sub"
  | "sub-shadow"
  | "flat-inv"
  | "flat-1"
  | "danger"
  | "neutral-inv"
  | "slate"
  | "violet-inv"
  | "warn";

export default function MultiButton({
  classNames = {},
  className = "",
  type = "button",
  skipFocus = false,
  isLoading = false,
  disabled = false,
  icon = null,
  children = null,
  target = "_self",
  onClick = () => {},
  onMouseEnter = () => {},
  isActive = false,
  to = "#",
  styleName = "flat",
}: {
  classNames?: Record<string, boolean>;
  className?: string;
  isLoading?: boolean;
  target?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onMouseEnter?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  to?: string;
  styleName?: StyleName;
}) {
  let [searchParams, setSearchParams] = useSearchParams();

  let topEl = to != "#" ? Link : skipFocus ? "div" : "button";
  let props = {
    target,
    type: type,
    disabled: disabled || isLoading,
    onMouseEnter,
    onClick: (e) => {
      onClick(e);
      let input_el = e.target.querySelectorAll("input")[0];
      if (input_el) {
        input_el.focus();
      }
    },
    className:
      "relative no_highlights my-2 select-none font-[600] border-none outline-none transition-colors duration-150 flex flex-row flex-inline items-center cursor-pointer text-base rounded-3xl ring-inset-0 hover:ring-4 focus:ring-4 px-6 py-2.5 " +
      cn({ ...classNames, "opacity-50 !outline-none": disabled || isLoading }) +
      " " +
      className +
      " " +
      (style_map[styleName]
        ? style_map[styleName][isActive ? "on" : "off"]
        : ""),
  };

  if (to) {
    props.to = to;
  }

  return createElement(topEl, props, children);
}
