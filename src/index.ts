import "dotenv/config";

import express, { type Request, type Response } from "express";
import cors from "cors";

import { userRouter } from "./routes/user.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);

const PORT = process.env.PORT || 3000;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
