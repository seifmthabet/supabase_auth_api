import Router, { type Request, type Response } from "express";

import supabase from "../config/supabase";

const userRouter = Router();

userRouter.post("/auth/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

		if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User created successfully", data });
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
			email: email.trim(),
			password: password,
		});

		if (error) {
			console.error(error);
			return res.status(400).json({ error: error.message });
		}

		res.status(200).json({ message: "User logged in successfully", data : {
			access_token: data.session.access_token,
			refresh_token: data.session.refresh_token,
		} });
		
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
})

export { userRouter };
