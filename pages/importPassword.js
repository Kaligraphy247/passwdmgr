import Head from "next/head";
import QuickLinks from "../components/quickLinks";
import { AlertInfo } from "../components/alerts";
import { withSessionSsr } from "../lib/config/withSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faCircleInfo,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

const fileImport = <FontAwesomeIcon icon={faFileImport} />;
const info = <FontAwesomeIcon icon={faCircleInfo} />;
const fileExport = <FontAwesomeIcon icon={faFileExport} />;

export default function ImportPasswords({ user }) {
  const [alertMsg, setAlertMsg] = useState({ msg: "Message", isHidden: true });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData(form);

    const endpoint = "/api/importPassword";

    const options = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);

    if (result.ok) {
      setAlertMsg({ msg: "File imported successfully.", isHidden: false });
    } else {
      setAlertMsg({
        msg: "An error occurred, please try again.",
        isHidden: false,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Import Password</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-2">Import Passwords</h1>
      <h3 className="text-2xl font-bold py-1">Import your password</h3>
      {alertMsg.isHidden ? "" : <AlertInfo message={alertMsg.msg} />}

      <div className="container">
        <h2 className="font-medium text-lg">
          Import your passwords from a valid JSON file
        </h2>

        <form
          className="border-2 py-2 px-1 border-dotted border-[rgba(146,153,181,1)]"
          onSubmit={handleSubmit}
        >
          <div className="pb-3 text-sm text-center">
            <p>
              <span className="text-blue-600">{info}</span> Only works on
              passwords exported from{" "}
              <Link
                href="/exportPassword"
                className="hover:text-purple-500 text-blue-700"
              >
                Export {fileExport}
              </Link>
            </p>
          </div>
          <input value={user.id} hidden readOnly name="currentUser"></input>
          <input
            type="file"
            required
            accept=".json"
            className="text-blue-500 text-sm file:text-blue-500 file:rounded file:px-2 file:py-1 file:border-none file:bg-blue-100 file:text-sm file:hover:bg-blue-200 file:hover:text-blue-600 focus:outline-blue-400 "
            name="file"
          />
          <div className="text-center">
            <button
              className="border px-2 py-1 rounded font-semibold hover:shadow-md border-[#8f9094]"
              type="submit"
            >
              Import {fileImport}
            </button>
          </div>
        </form>
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
  }
  return {
    props: { user },
  };
});
