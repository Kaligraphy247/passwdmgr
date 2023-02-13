import QuickLinks from "../components/quickLinks";
import SearchBar from "../components/search";
import { NoRecent } from "../components/recent";
import ButtonWithTooltip from "../components/buttonWithTooltip";
import { fetchAllPasswords } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faClipboardList,
  faFileCirclePlus,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const plus = <FontAwesomeIcon icon={faFileCirclePlus} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;
const clipboard = <FontAwesomeIcon icon={faClipboardList} className="pt-1 " />;

export default function MyPasswords({ data }) {
  // * get length of passwords, use it to render ui based on length
  let passwordsObjectLength = data.length;

  // * render
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">My Passwords</h1>
      <SearchBar />
      <div className="flex justify-between mb-1">
        <h3 className="text-2xl font-bold py-1">Recently saved passwords</h3>
        <button className="px-2 py-0.5 mb-1 rounded text-md shadow hover:shadow-md bg-green-500 text-white">
          <Link href="/addNew">Add new {plus}</Link>
        </button>
      </div>
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
                    <button>{eye}</button>
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
                    <button>{trash}</button>
                  </ButtonWithTooltip>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <QuickLinks />
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetchAllPasswords(1);
  return { props: { data } };
}
