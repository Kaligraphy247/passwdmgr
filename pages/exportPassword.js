import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faCircleInfo,
  faFileExport,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const fileImport = <FontAwesomeIcon icon={faFileImport} />;
const info = <FontAwesomeIcon icon={faCircleInfo} />;
const fileExport = <FontAwesomeIcon icon={faFileExport} />;
const download = <FontAwesomeIcon icon={faDownload} />;

export default function ExportPasswords() {
  return (
    <>
      <Head>
        <title>Export Password</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Export Passwords</h1>
      <h3 className="text-2xl font-bold py-1">Export your passwords here</h3>
      <div className="container">
        <h2 className="font-medium text-lg">
          Export your passwords to a valid JSON file that can be downloaded.
        </h2>

        <form className="border-2 py-2 px-1 border-dotted">
          <div className="pb-3 text-sm">
            <p>
              <span className="text-blue-600">{info}</span> Suitable for files
              to be used for{" "}
              <Link
                href="/importPassword"
                className="hover:text-red-500 text-blue-700"
              >
                Import {fileImport}
              </Link>
            </p>
          </div>
          <input
            type="file"
            className="text-blue-500 text-sm file:text-blue-500 file:rounded file:px-2 file:py-1 file:border-none file:bg-blue-100 file:text-sm file:hover:bg-blue-200 file:hover:text-blue-600 focus:outline-blue-400"
          />
          <div className="text-center">
            <button className="border px-2 py-1 rounded font-semibold shadow-md">
              Export {fileExport}
            </button>
          </div>
        </form>
        <div className="py-2 px-1 mt-6">Ready to download {download}</div>
      </div>
      <QuickLinks />
    </>
  );
}
