export function RecentlySaved() {
  return (
    <>
      <ul className="border shadow-md rounded-md">
        <li className="grid grid-cols-2 border-b">
          <span className="border-r px-2 py-1 truncate text-lg">
            Test 1 lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem
          </span>
          <span className="px-2 py-1 blur-[7px] select-none">
            blurred passwords
          </span>
        </li>
        <li className="grid grid-cols-2">
          <span className="border-r px-2 py-1 truncate text-lg">Test 1</span>
          <span className="px-2 py-1 blur-[7px] select-none">*****</span>
        </li>
        <li className="grid grid-cols-2">
          <span className="border-r px-2 py-1 truncate text-lg">Test 1</span>
          <span className="px-2 py-1 blur-[7px] select-none">*****</span>
        </li>
      </ul>
    </>
  );
}

export function NoRecent() {
  return (
    <>
      <p className="border text-gray-400 text-center py-8 px-4 rounded">
        Nothing available yet
      </p>
    </>
  );
}

// export RecentlySaved
