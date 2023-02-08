import QuickLinks from "../components/quickLinks";
import SearchBar from "../components/search";
import ButtonWithTooltip from "../components/buttonWithTooltip";
import { fetchAllPasswords } from "../models/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEye,
  faEyeSlash,
  faClipboardList,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const pen = <FontAwesomeIcon icon={faPenToSquare} className="pt-1" />;
const trash = <FontAwesomeIcon icon={faTrash} className="text-red-500 pt-1" />;
const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;
const clipboard = <FontAwesomeIcon icon={faClipboardList} className="pt-1 " />;

export default function MyPasswords({ data }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">My Passwords</h1>
      <SearchBar />
      <h3 className="font-semibold">
        Total Passwords saved so far :<>&nbsp;</> {data.length}.
      </h3>
      <div className="container">
        <ul className="">
          {data.map(({ website, password, id }) => (
            <li
              className="flex justify-between p-2 rounded shadow hover:bg-slate-100 hover:shadow-slate-400 mb-5"
              key={id}
            >
              <p className="truncate">
                <Link href="">{website}</Link>
              </p>
              <p className="px-2 blur-[7px] select-none truncate">{password}</p>
              <span className="space-x-4 flex">
                <ButtonWithTooltip message="Show">
                  <button>{eye}</button>
                </ButtonWithTooltip>
                <ButtonWithTooltip message="Edit">
                  <button>{pen}</button>
                </ButtonWithTooltip>
                <ButtonWithTooltip message="Delete">
                  <button>{trash}</button>
                </ButtonWithTooltip>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <QuickLinks />
    </>
  );
}
export async function getServerSideProps() {
  const data = await fetchAllPasswords(1);
  return { props: { data } };
}
