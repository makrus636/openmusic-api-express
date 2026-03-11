import express from 'express';
import {
  getAlbums,
  getAlbumById,
  addAlbum,
  editAlbumById,
  deleteAlbumById,
} from '../controller/index.js';
import validate from '../../../middlewares/validate.js';
import { AlbumPayloadSchema, AlbumEditPayloadSchema } from '../../../validator/schema.js';

const router = express.Router();

router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);
router.post('/albums', validate(AlbumPayloadSchema), addAlbum);
router.put('/albums/:id', validate(AlbumEditPayloadSchema), editAlbumById);
router.delete('/albums/:id', deleteAlbumById);

export default router;