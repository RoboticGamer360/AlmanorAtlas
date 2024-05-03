import express from "express";
import { verifyAccessToken } from "../utils/auth";

// Create router.
const router = express.Router();

// Validate JWT from user.
router.get('/verify_token', async (req, res) => {
  try {
    verifyAccessToken(String(req.query.token));
    res.json({ status: 'valid' });
  } catch(err) {
    res.status(200).json({
      status: 'invalid',
      message: (err as Error).message
    });
  }
});

export default router;
