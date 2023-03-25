// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createTodo } from "@/services/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const data = req.body;
    await createTodo(data);
    res.status(200).json({ name: "John Doe" });
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
