import fs from "fs";
import { importPassword } from "../../models/models";
import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";

const importPasswordHandler = nextConnect();
importPasswordHandler.use(middleware);

// ? on post method
importPasswordHandler.post(async (req, res) => {
  const { currentUser } = req.body;
  //* do  some more stuff here
  const importPath = "public/imports";
  const file = req.files["file"][0];
  const fileName = req.files["file"][0].originalFilename;
  const readStream = fs.createReadStream(file.path, { highWaterMark: 1024 });
  const data = [];
  // console.log(file);

  //? reading stream,
  readStream.on("data", (chunk) => {
    data.push(chunk);
    // * As a reminder
    // console.log("data: ", chunk, chunk.length);
  });

  //? at the end of the readstream
  readStream.on("end", () => {
    //* write file to disk
    // fs.writeFileSync(importPath + `/${fileName}`, Buffer.concat(data));

    //* or use from memory
    const fileBufferInMemory = Buffer.concat(data);
    for (const passwd of JSON.parse(fileBufferInMemory.toString())) {
      importPassword(passwd.id, passwd.website, passwd.password);
    }
  });

  //? if error while trying readstream
  readStream.on("error", (err) => {
    console.log(err);
  });
  return res.status(200).json({ ok: "OK" });
});

// ? on get method
importPasswordHandler.get(async (req, res) => {
  return res.status(405).json({ err: `Method ${req.method} Not Allowed` });
});

//? disable body parse
export const config = {
  api: {
    bodyParser: false,
  },
};

export default importPasswordHandler;
