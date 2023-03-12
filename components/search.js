import { useRouter } from "next/router";

export default function SearchBar({ user }) {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // * redirect to result page
    router.push(`/search?q=${event.target.search.value}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-4 mb-8 border border-blue-300 rounded">
          <input
            className="px-2 bg-blue-100 w-full h-[42px] rounded-l outline-none  caret-blue-600 selection:bg-blue-400 selection:text-white"
            placeholder="Search"
            name="search"
          ></input>
          <button className="h-[42px] bg-blue-100 px-2 text-lg rounded-r border-l border-blue-200">
            Search
          </button>
        </div>
      </form>
    </>
  );
}
