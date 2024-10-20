import type { Request, Response } from "express";
import queue from "../lib/queue";
import { z } from "zod";

export default {
  async store(req: Request, res: Response) {
    const parseObject = z.object({
      name: z.string({ required_error: "Name is a required" }).min(1).trim(),
      email: z
        .string({ required_error: "Email is required" })
        .email("Not a valid email")
        .trim(),
      password: z
        .string({ required_error: "Password is required" })
        .min(5)
        .trim(),
    });

    const user = parseObject.parse(req.body);

    await queue.add("RegistrationMail", { user });

    return res.json(user);
  },
};
