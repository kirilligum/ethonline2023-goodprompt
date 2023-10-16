export default function ({ isPaused = false, className }) {
  return (
    <div className={"flex flex-row " + className}>
      {isPaused ? (
        <>
          <div className="w-4 h-6 rounded-full bg-flat-200 m-1 "></div>
          <div className="w-4 h-6 rounded-full bg-flat-200 m-1 "></div>
        </>
      ) : (
        <>
          {" "}
          <div className="w-4 h-6 rounded-full bg-prime-500 m-1 elementToFadeInAndOut"></div>
          <div className="w-4 h-6 rounded-full bg-prime-500 m-1 elementToFadeInAndOut2"></div>
        </>
      )}
    </div>
  );
}
