import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      name: 'Path Not Found',
      message: `The path "${req.path}" was not found on this server.`
    }
  });
});

export default router;