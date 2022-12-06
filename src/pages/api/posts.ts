import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  console.log(req.method);

  switch (method) {
    case 'GET':
      const data = readPostInfo();
      res.status(200).json({ dir: data });
      break;
    default:
      res.status(404).json({ ok: false });
  }
};

export default handler;

function readPostInfo() {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);
  const data = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), 'posts', fileName);
    const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' });
    return matter(fileContent).data;
  });

  return data;
}
