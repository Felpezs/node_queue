import type { Request, Response } from "express";
import mailQueue from "../lib/queue";
import queue from "../lib/queue";

type User = {
  name: string;
  email: string;
  password: string;
};

export default {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body as User;

    const user = {
      name,
      email,
      password,
    };

    await queue.add("RegistrationMail", { user });

    return res.json(user);
  },
};
