import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faFileImport,
  faFileExport,
  faFolder,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const settings = <FontAwesomeIcon icon={faWrench} />;
const fileImport = <FontAwesomeIcon icon={faFileImport} />;
const fileExport = <FontAwesomeIcon icon={faFileExport} />;
const folder = <FontAwesomeIcon icon={faFolder} />;
const home = <FontAwesomeIcon icon={faHouse} />;
const logout = <FontAwesomeIcon icon={faRightFromBracket} />;

export default function QuickLinks() {
  const { asPath } = useRouter();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout");

    if (response.ok) {
      router.push("/login");
    }
  };
  return (
    <>
      <div className="mt-6 text-center space-x-4">
        {asPath !== "/" ? (
          <button className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300">
            <Link href="/">Home {home}</Link>
          </button>
        ) : (
          <button className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300">
            <Link href="/myPasswords">All {folder}</Link>
          </button>
        )}

        <button className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300">
          <Link href="/importPassword">Import {fileImport}</Link>
        </button>

        <button className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300">
          <Link href="/exportPassword">Export {fileExport}</Link>
        </button>

        <button className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300">
          <Link href="/settings">Settings {settings}</Link>
        </button>

        <button
          className="p-1 rounded w-[100px] h-[40px] hover:shadow hover:border hover:border-gray-300"
          onClick={handleLogout}
        >
          Logout {logout}
        </button>
      </div>
    </>
  );
}
