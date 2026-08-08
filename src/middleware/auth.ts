import type { Request, Response, NextFunction } from "express";
import supabase from "../config/supabase";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        "message": "Missing authorization header",
      })
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        "message": "Invalid authorization header",
      })
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        "message": "Invalid token",
      })
    }

    req.user = {
      id: user.id,
      email: user.email as string,
    };

    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      "message": "Authentication failed",
    })
  }
}