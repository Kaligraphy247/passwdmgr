export default function SearchBar() {
  return (
    <>
      <div className="flex mt-4 mb-8 border border-blue-300 rounded">
        <input
          className="px-2 bg-blue-100 w-full h-[42px] rounded-l outline-none  caret-blue-600"
          placeholder="Search"
        ></input>
        <button className="h-[42px] bg-blue-100 px-2 text-lg rounded-r border-l border-blue-200">
          Search
        </button>
      </div>
    </>
  );
}
