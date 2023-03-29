import { useRouter } from "next/router";
import QuickLinks from "/components/quickLinks";
import { fetchOnePassword } from "/models/models.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AlertInfo } from "/components/alerts.js";
import { withSessionSsr } from "../../../lib/config/withSession";

const save = <FontAwesomeIcon icon={faSave} />;

export default function Single({ data }) {
  //* constants
  const router = useRouter();
  const { id } = router.query;
  const [savedStatus, setSavedStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    //* preferable when using event handlers
    const data = {
      id: id,
      website: event.target.website.value,
      password: event.target.password.value,
    };

    // * set endpoint
    const endpoint = "/api/editPassword";

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
    setSavedStatus(<AlertInfo message={result.data} />);
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-2">Account - {data.map(({website}) => (website))}</h1>
      <>{savedStatus}</>
      <div className="container">
        {data.map(({ id, website, password, createdAt, updatedAt }) => (
          <div key={id}>
            <h3 className="text-2xl font-bold py-1">
              Edit{" "}
              <span className="bg-blue-100 rounded px-1 p-0.5 text-blue-500">
                {website}
              </span>
            </h3>
            <form className="grid" onSubmit={handleSubmit} key={id}>
              <label className="text-lg pl-1 font-medium pt-2">Website</label>
              <input
                className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
                name="website"
                defaultValue={website}
              />
              <label className="text-lg pl-1 font-medium pt-2">Password</label>
              <input
                className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
                name="password"
                defaultValue={password}
              />
              <label className="text-lg pl-1 font-medium pt-2">
                Created at
              </label>
              <input
                className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
                defaultValue={createdAt}
                readOnly
              />
              <label className="text-lg pl-1 font-medium pt-2">
                Last updated
              </label>
              <input
                className="bg-inherit border outline-none rounded p-1 focus:outline-1 focus:outline-blue-200 focus:border-none focus:rounded-sm border-[#8f9094]"
                defaultValue={updatedAt}
                readOnly
              />
              <div className="mt-3 text-center">
                <button
                  className="border rounded px-2 py-1 text-lg font-medium shadow hover:shadow-md border-[#8f9094]"
                  type="submit"
                >
                  Save
                  <>&nbsp;</>
                  {save}
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
      <QuickLinks />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const data = await fetchOnePassword(context.params.id);
//   return { props: { data } };
// }

//* fetch user session from cookies if available, and pass to component
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
