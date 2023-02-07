import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} className="pt-1" />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} className="pt-1" />;

export function RecentlySaved() {
  return (
    <div className="">
      <ul className="border shadow-md rounded p-2">
        <li className="flex justify-between p-2 rounded shadow hover:bg-slate-100 hover:shadow-slate-400 mb-5">
          <p className="truncate">
            <Link href="">Lorem Lorem Lorem Lorem Lorem</Link>
          </p>
          <p className="px-2 blur-[7px] select-none truncate">
            password password password
          </p>
          <span className="space-x-4">
            <Link href="">{eye}</Link>
          </span>
        </li>
        {/* todo */}
      </ul>
    </div>
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
