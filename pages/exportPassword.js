import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import Link from "next/link";
import { useState } from "react";
import { withSessionSsr } from "./lib/config/withSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faCircleInfo,
  faFileExport,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const fileImport = <FontAwesomeIcon icon={faFileImport} />;
const info = <FontAwesomeIcon icon={faCircleInfo} />;
const fileExport = <FontAwesomeIcon icon={faFileExport} />;
const download = <FontAwesomeIcon icon={faDownload} />;

export default function ExportPasswords({ user }) {
  const [downloadState, setDownloadState] = useState("");
  const [showDlBtn, setShowDlBtn] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    const data = {
      id: user.id,
    };
    const endpoint = "/api/exportPassword";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);

    const result = await response.json();
    if (result.ok) {
      setDownloadState(`File is ready to download `);
      setShowDlBtn(true);
    }
    // console.log(result);
  };

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
          <div className="pb-3 text-sm text-center">
            <p>
              <span className="text-blue-600">{info}</span> Suitable for files
              to be used for{" "}
              <Link
                href="/importPassword"
                className="hover:text-violet-500 text-blue-700"
              >
                Import {fileImport}
              </Link>
            </p>
          </div>
          <div className="text-center">
            <button
              className="border px-2 py-1 rounded font-semibold shadow-md"
              onClick={handleClick}
            >
              Export {fileExport}
            </button>
          </div>
        </form>
        <div className="py-1 px-1 mt-2">
          {downloadState}
          {showDlBtn ? (
            <Link
              href="/exports/passwords.json"
              alt="Passwords.json"
              target="_blank"
              download={true}
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <>&nbsp;</>
              {download}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <QuickLinks />
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user },
    };
  }
});
