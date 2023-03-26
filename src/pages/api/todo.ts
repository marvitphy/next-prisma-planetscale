// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createTodo } from "@/services/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  todo?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const data = req.body;
    const newtodo = await createTodo(data);
    res.status(200).json({
      message: "Todo created",
      todo: newtodo,
    });
  } else if (req.method == "DELETE") {
    const data = req.query;
    res.status(200).json({
      message: JSON.stringify(data),
    });
  }
}
