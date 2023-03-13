import { useRouter } from "next/router";
import QuickLinks from "/components/quickLinks";
import { fetchOnePassword } from "/models/models.js";
import { useState } from "react";
import Link from "next/link";
import { AlertInfo } from "/components/alerts";
import { withSessionSsr } from "../../lib/config/withSession";

export default function Single({ data }) {
  //* constants
  const router = useRouter();
  const { id } = router.query;
  const [deleteStatus, setDeleteStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    //* preferable when using event handlers
    const data = {
      id: id,
      delete: event.target.delete.value,
    };

    // * set endpoint
    const endpoint = "/api/deletePassword";

    //* Form the request for sending data to the server
    const options = {
      method: "POST",
      headers: {
        // Tell the server what type of data we're sending
        // multipart/form-data is also an example
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    //* Send the form data to forms API and get a response
    const response = await fetch(endpoint, options);

    //* get the response from the server as JSON.
    const result = await response.json();
    setDeleteStatus(<AlertInfo message={result.data} />);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">
        Delete Account Data
      </h1>
      <>{deleteStatus}</>
      <div className="container">
        {data.map(({ id, website }) => (
          <form onSubmit={handleSubmit} key={id}>
            <h1 className="text-2xl font-bold mb-2 text-center">
              Are you sure you want to delete Account -{" "}
              <span className="bg-blue-100 rounded px-1 p-0.5 text-blue-500">
                {website}
              </span>
              ?
            </h1>
            <div className="space-x-4 text-center">
              <label className="">
                Yes
                <input
                  type="radio"
                  className="ml-2 mt-2"
                  name="delete"
                  value="yes"
                />
              </label>
              <label className="">
                No
                <input
                  type="radio"
                  className="ml-2 mt-2"
                  name="delete"
                  value="no"
                  defaultChecked
                />
              </label>
            </div>
            <div className="text-center space-x-4">
              <button
                type="button"
                className="text-white bg-blue-500 rounded px-2 py-1 mt-2 hover:shadow"
              >
                <Link href="/myPasswords">Go back</Link>
              </button>
              <button
                type="submit"
                className="text-white bg-red-500 rounded px-2 py-1 mt-2 hover:shadow"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
      <QuickLinks />
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, params }) => {
  const user = req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // implicit else
  const data = await fetchOnePassword(params.id);
  return {
    props: { user, data },
  };
});
