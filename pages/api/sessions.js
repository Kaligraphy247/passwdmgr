import { withSessionRoute } from "/pages/lib/config/withSession";
import { fetchOneUser } from "../../models/models";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const currentUser = await fetchOneUser(username, password);
    // console.log("current ", currentUser[0]);
    if (!username || !password) {
      return res
        .status(400)
        .json({ data: "Please check you login details and try again" });
    }
    if (
      username === currentUser[0].lastName &&
      password === currentUser[0].masterPassword
    ) {
      req.session.user = currentUser[0];

      await req.session.save();
      res.send({ ok: true });
    }
    return res.status(403).send("403 ERROR CODE!");
  }
  return res.status(404).send("404 ERROR CODE!");
}
