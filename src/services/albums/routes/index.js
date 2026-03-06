import express from 'express';
import {
  getAlbums,
} from '../controller/index.js';

const router = express.Router();

router.get('/albums', getAlbums);

export default router;