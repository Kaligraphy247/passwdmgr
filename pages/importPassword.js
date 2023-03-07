import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faCircleInfo,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const fileImport = <FontAwesomeIcon icon={faFileImport} />;
const info = <FontAwesomeIcon icon={faCircleInfo} />;
const fileExport = <FontAwesomeIcon icon={faFileExport} />;

export default function ImportPasswords() {
  return (
    <>
      <Head>
        <title>Import Password</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Import Passwords</h1>
      <h3 className="text-2xl font-bold py-1">Import your password</h3>
      <div className="container">
        <h2 className="font-medium text-lg">
          Import your passwords from a valid JSON file
        </h2>

        <form className="border-2 py-2 px-1 border-dotted">
          <div className="pb-3 text-sm">
            <p>
              <span className="text-blue-600">{info}</span> Only works on
              passwords exported from{" "}
              <Link
                href="/exportPassword"
                className="hover:text-red-500 text-blue-700"
              >
                Export {fileExport}
              </Link>
            </p>
          </div>
          <input
            type="file"
            className="text-blue-500 text-sm file:text-blue-500 file:rounded file:px-2 file:py-1 file:border-none file:bg-blue-100 file:text-sm file:hover:bg-blue-200 file:hover:text-blue-600 focus:outline-blue-400"
          />
          <div className="text-center">
            <button className="border px-2 py-1 rounded font-semibold shadow-md">
              Import {fileImport}
            </button>
          </div>
        </form>
      </div>
      <QuickLinks />
    </>
  );
}
