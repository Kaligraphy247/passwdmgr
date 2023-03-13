// * Delete password

import { deletePassword } from "/models/models";

export default function deletePasswordHandler(req, res) {
  // get data submitted in req body
  const body = req.body;
  console.log(body);

  if (!body.delete) {
    return res.status(400).json({ data: "Please select an option!" });
  }
  // implicit else
  //* delete from db
  if (body.delete === "yes") {
    deletePassword(body.id);
    return res.status(200).json({ data: "Deleted!" });
  } else {
    return res.status(200).json({ data: "Nothing Happened 🤷‍♀️" });
  }
}
