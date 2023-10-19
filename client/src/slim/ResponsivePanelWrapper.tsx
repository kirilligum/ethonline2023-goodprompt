import { XMarkIcon } from "@heroicons/react/24/solid";
import MultiButton from "./MultiButton";

export default function ResponsivePanelWrapper({
  children,
  className,
  ref,
}: {
  children: any;
}) {
  return (
    <div ref={ref} className={"relative " + className}>
      <div className="absolute left-0 -top-24 md:hidden w-full flex p-3 items-center content-center justify-center pointer-events-none">
        <XMarkIcon className="w-8 fill-white"></XMarkIcon>
      </div>
      {children}
    </div>
  );
}
