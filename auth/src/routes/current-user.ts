import express, { Request, Response } from "express";

import { currentUser, requireAuth } from "@mandi_telor/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  // requireAuth,
  (req: Request, res: Response) => {
    return res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
