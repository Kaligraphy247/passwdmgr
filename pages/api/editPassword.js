import { updatePassword } from "/models/models";

export default function updatePasswordHandler(req, res) {
  // get data submitted in req body
  const body = req.body;
  console.log(body);

  if (!body.website || !body.password) {
    return res
      .status(400)
      .json({ data: "Account name, or password not found!" });
  }
  // implicit else
  //* save to db
  updatePassword(body.id, body.website, body.password);
  return res.status(200).json({ data: "Saved!" });
}
