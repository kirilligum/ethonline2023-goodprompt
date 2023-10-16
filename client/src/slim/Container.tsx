export default function Container(props) {
  return (
    <div
      {...props}
      className={
        "relative overflow-hidden flex flex-col px-6 py-3 items-center rounded-3xl " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.label && <span className="text-sm opacity-70">{props.label}</span>}
      {props.children}
    </div>
  );
}
