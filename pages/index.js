import { RecentlySaved, NoRecent } from "../components/recent";
import SearchBar from "../components/search";
import QuickLinks from "../components/quickLinks";
import Link from "next/link";
import { fetchRecentPassword } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faMagnifyingGlass,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ButtonWithTooltip from "../components/buttonWithTooltip";

const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="pt-1" />;

export default function App({ data }) {
  let passwordsObjectLength = data.length;
  const name = "James";

  const tempFunc = () => {
    // window.confirm("yes");
    let username = window.prompt("Please enter your username");
    // console.log(username.toLowerCase()); //! debug
    let password = window.prompt("Please enter your master password");
    // console.log(password.toLowerCase()); //! debug
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Welcome, {name}</h1>
      <SearchBar />
      <div className="flex justify-between mb-1">
        <h3 className="text-2xl font-bold py-1">Recently saved passwords</h3>
        <button className="px-2 py-0.5 mb-1 rounded text-md shadow hover:shadow-md bg-green-500 text-white">
          <Link href="/addNew">Add new {plus}</Link>
        </button>
      </div>

      <div>
        {passwordsObjectLength < 1 ? (
          <NoRecent />
        ) : (
          <div className="container overflow-auto max-h-[480px]">
            <ul className="">
              {data.map(({ website, password, id }) => (
                <li
                  className="flex justify-between p-2 rounded shadow hover:bg-slate-100 hover:shadow-slate-400 mb-5"
                  key={id}
                >
                  <p className="truncate">
                    <Link href="">{website}</Link>
                  </p>
                  <p className="px-2 blur-[7px] select-none truncate">
                    {password}
                  </p>
                  <span className="space-x-4 flex">
                    <ButtonWithTooltip message="Show">
                      <button onClick={tempFunc}>{eye}</button>
                    </ButtonWithTooltip>
                    <ButtonWithTooltip message="Edit">
                      <button>
                        <Link
                          href={{
                            pathname: "/myPasswords/edit/[id]",
                            query: { id: id },
                          }}
                        >
                          {pen}
                        </Link>
                      </button>
                    </ButtonWithTooltip>
                    <ButtonWithTooltip message="Delete">
                      <button>
                        <Link
                          href={{
                            pathname: "/myPasswords/delete/[id]",
                            query: { id: id },
                          }}
                        >
                          {trash}
                        </Link>
                      </button>
                    </ButtonWithTooltip>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <QuickLinks />
      </div>
    </div>
  );
}

// https://stackoverflow.com/questions/58075798/dynamic-routing-with-multiple-parameters-in-next-js
export async function getServerSideProps() {
  const data = await fetchRecentPassword(1);
  return { props: { data } };
}
