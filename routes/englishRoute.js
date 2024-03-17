import express from 'express';
import * as englishController from '../controllers/englishController.js';

const router = express.Router();

router
  .route('/')
  .post(englishController.addWord)
  .get(englishController.getWords);

export default router;