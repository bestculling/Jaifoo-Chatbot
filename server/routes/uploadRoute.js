import express from 'express';
import { upload } from '../controllers/uploadController.js';

const router = express.Router();

router.get("/upload", upload)

export default router;