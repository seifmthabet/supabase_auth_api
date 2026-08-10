import "dotenv/config";

import express, { type Request, type Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { userRouter } from "./routes/user.router";
import { openApiDocument } from "./openapi";

import supabase from "./config/supabase";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.get("/openapi.json", (_req: Request, res: Response) => {
  return res.json(openApiDocument);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

const PORT = process.env.PORT || 3000;

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
  });
});

const start = async (): Promise<void> => {
  const { error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error connecting to Supabase:", error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT} and connected to Supabase`,
    );
  });
};

start();
