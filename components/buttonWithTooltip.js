export default function ButtonWithTooltip({ message, children }) {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      <span className="absolute bottom-[22px] scale-0 transition-all rounded bg-gray-600 p-1 text-sm text-white group-hover:scale-75 group-hover:flex whitespace-nowrap z-10 leading-none">
        {message}
      </span>
    </div>
  );
}
