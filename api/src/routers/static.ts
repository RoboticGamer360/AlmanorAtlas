import path from 'path';
import express from 'express';

const router = express.Router();

router.use(express.static(path.resolve('build/public')));

router.get('*', (_req, res) => {
  res.sendFile(path.resolve('build/public/index.html'));
});

export default router;