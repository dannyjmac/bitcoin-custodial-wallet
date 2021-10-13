import { Request, Response } from "express";
import ln from "../Lightning";
import db from "../Supabase";

class LightningController {
  connect = async (req: Request, res: Response) => {
    await ln.connect();
  };

  getInfo = async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) throw new Error("Your node is not connected!");
    const node = await db.getNodeByToken(token);
    if (!node) throw new Error("Node not found with this token");
  };
}

export default new LightningController();
