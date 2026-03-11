import express from 'express';
import { SongsPayloadSchema, SongsEditPayloadSchema } from '../../../validator/schema.js';
import { addSong, getSongs, getSongById, editSongById, deleteSongById } from '../controller/index.js';
import validate from '../../../middlewares/validate.js';

const router = express.Router();

router.post('/songs', validate(SongsPayloadSchema), addSong);
router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.put('/songs/:id', validate(SongsEditPayloadSchema), editSongById);
router.delete('/songs/:id', deleteSongById);

export default router;