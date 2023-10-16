import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import MultiButton from "./MultiButton";
import Overlay from "./Overlay";

export default function ErrorOverlay({
  onClearError = () => {},
  error = null,
}: {
  onClearError?: () => void;
  error?: Error | null;
}) {
  return (
    <Overlay isVisible={!!error}>
      {(error && (
        <MultiButton styleName="danger" className="mx-2" onClick={onClearError}>
          <div className="items-center content-center flex flex-row">
            <ExclamationTriangleIcon className="w-10 mr-4"></ExclamationTriangleIcon>

            <b className="text-left">
              {error?.message || "An error occurred."}
            </b>
          </div>
        </MultiButton>
      )) ||
        null}
    </Overlay>
  );
}
