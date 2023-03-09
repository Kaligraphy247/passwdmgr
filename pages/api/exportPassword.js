import fs from "fs";
import { exportPassword } from "../../models/models";

export default async function exportPasswordHandler(req, res) {
  const { id } = req.body;
  const passwordFile = "public/exports/passwords.json";
  const passwords = await exportPassword(id).then((results) => {
    return results;
  });
  // console.log(passwords);
  if (req.method === "POST") {
    fs.writeFile(passwordFile, JSON.stringify(passwords), (err) => {
      if (err) {
        throw err;
      }
      console.log("Exporting passwords was a Success!");
    });
    return res.json({ ok: "OK" });
  }

  return res.json({ err: "Not OK" });
}
