import { RecentlySaved, NoRecent } from "../components/recent";
import SearchBar from "../components/search";
import QuickLinks from "../components/quickLinks";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const plus = <FontAwesomeIcon icon={faPlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;

export default function App() {
  const s = 0;
  const name = "James";
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Welcome, {name}</h1>
      <SearchBar />
      <div className="flex justify-between mb-1">
        <h3 className="text-2xl font-bold py-1">Recently saved passwords</h3>
        <div>
          <button className="px-2 py-1 mb-1 rounded text-lg shadow hover:shadow-md bg-green-500 text-white">
            <Link href="/addNew">Add new {plus}</Link>
          </button>
        </div>
      </div>

      <div>
        {s === 0 ? <NoRecent /> : <RecentlySaved />}
        <QuickLinks />
      </div>
    </div>
  );
}
