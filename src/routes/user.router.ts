import Router, { type Request, type Response } from "express";

import supabase from "../config/supabase";

import { requireAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/auth/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("auth/logout", requireAuth, async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

userRouter.get("/public/info", async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "This is a public endpoint" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get(
  "protected/profile",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      return res
        .status(200)
        .json({
          message: "This is a protected endpoint",
          user: (req as any).user,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { userRouter };
