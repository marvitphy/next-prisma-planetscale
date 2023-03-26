// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteTodo } from "@/services/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "DELETE") {
    const data = req.query;
    try {
      const deletedTodo = await deleteTodo(data.id as string);
      res.status(200).json({
        message: "Todo deleted",
        data: deletedTodo,
      });
    } catch (err) {
      res.status(500).json({
        message: err as string,
      });
    }
  }
}
