import cn from "classnames";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";

const MD_WIDTH = 768;

function clampStyle(pos, style) {
  if (style.left) {
    style.left = Math.min(
      window.innerWidth - pos.width,
      Math.max(style.left, 0)
    );
  }
  if (style.right) {
    style.right = Math.min(
      window.innerWidth - pos.width,
      Math.max(style.right, 0)
    );
  }
  if (style.top) {
    style.top = Math.max(10 + pos.height, Math.max(style.top, 0));
  }
  if (style.bottom) {
    style.bottom = Math.min(
      Math.max(style.bottom, 0),
      window.innerHeight - pos.height - 100
    );
  }

  return style;
}

export default function Modal({
  isTransparent = false,
  useBottomUpCenter = false,
  useBottomLeftDownAlign = false,
  useLeft = false,
  useRight = false,
  useTop = false,
  useBottom = false,
  children = null,
  positionRef = undefined,
  isActive = false,
  classNames = {},
  closeModal = () => { },
  title = undefined,
}) {
  let [use_style_pos, setStylePos] = useState({});
  let [window_width, setWindowWidth] = useState(window.innerWidth);
  let [timer, setTimer] = useState(false);
  let modal_ref = useRef(null);


  useEffect(() => {
    var timeout_fn: any = null;
    function resize() {
      if (timer == true) {
        return;
      }
      timeout_fn = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setTimer(false);
      }, 500);
      setTimer(true);
    }
    window.addEventListener("resize", resize);
    return function () {
      window.removeEventListener("resize", resize);
      clearTimeout(timeout_fn);
    };
  }, []);

  function computeStyle() {
    let style_pos: any =
      !!positionRef &&
        (useBottomUpCenter || useLeft || useRight || useBottom || useTop)
        ? {
          position: "absolute",
        }
        : {};

    if (positionRef) {
      let pos = positionRef.getBoundingClientRect();
      let modal_pos = modal_ref.current?.getBoundingClientRect() || {
        width: 200,
        height: 200,
      };

      var left = pos.left + pos.width + 24;
      var bottom = window.innerHeight - (pos.top + pos.height);
      var top = pos.top + pos.height;
      var right = window.innerWidth - (pos.left + pos.width);

      if (useBottomLeftDownAlign && window_width > MD_WIDTH) {
        style_pos["top"] = top + 5;
        style_pos["left"] = left - pos.width / 2;
        style_pos["transform"] = "translate(0%, 0%)";
      } else if (useBottomUpCenter && window_width > MD_WIDTH) {
        style_pos["bottom"] = bottom + pos.height * 1.5;
        style_pos["left"] = left - pos.width / 2;
        style_pos["transform"] = "translate(-50%, 0%)";
      } else {
        if (useLeft) {
          style_pos["left"] = left;
        }

        if (useRight) {
          style_pos["right"] = right;
        }

        if (useBottom) {
          style_pos["bottom"] = bottom;
        }

        if (useTop) {
          style_pos["top"] = top;
        }
      }
      style_pos = clampStyle(modal_pos, style_pos);
    }
    setStylePos(style_pos);
  }

  useEffect(() => {
    setTimeout(() => {
      computeStyle();
    }, 0);
  }, [
    useBottomLeftDownAlign,
    isActive,
    positionRef,
    window_width,
    modal_ref.current,
  ]);

  return (
    <Transition appear show={isActive} as={Fragment}>
      <Dialog
        as="div"
        className={cn("relative z-10 cursor-crosshair ", { "pointer-events-none": isTransparent })}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={cn(classNames.overlay, "fixed inset-0 bg-neutral-400 bg-opacity-90")} />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-full items-end md:items-center justify-center md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                style={use_style_pos}
                className="fixed transform transition-all"
              >
                <div ref={modal_ref} className="w-fit h-fit cursor-auto pointer-events-auto max-h-[90vh]">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
