// * sets user session to cookies.

import { withSessionRoute } from "../../lib/config/withSession";
// import {withSessionRoute } from "../../lib/"
import { fetchOneUser } from "../../models/models";
import { verifyPassword } from "../../lib/config/bcryptjs-config";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const currentUser = await fetchOneUser(username);
    // console.log("current ", currentUser[0]);
    if (!username || !password) {
      return res
        .status(400)
        .json({ data: "Please check you login details and try again" });
    }
    if (
      username === currentUser[0].lastName &&
      verifyPassword(password, currentUser[0].masterPassword)
      // password === currentUser[0].masterPassword
    ) {
      req.session.user = currentUser[0];

      await req.session.save();
      return res.json({ ok: true }); //, err: "Passwords do not match or something else." });
    }
    return res.status(403).send("403 ERROR CODE!");
  }
  return res.status(404).send("404 ERROR CODE!");
}
