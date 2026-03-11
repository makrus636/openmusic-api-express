import SongsRepositories from '../repositories/songs-reporitories.js';
const songsRepositories = new SongsRepositories();

export const addSong = async (req, res) => {
  const { title, year, performer, genre, duration, albumId } = req.body;
  const songs = await songsRepositories.addSong({ title, year, performer, genre, duration, albumId });
  return res.status(201).json({
    status: 'success',
    data: {
      songId: songs,
    },
  });
};

export const getSongs = async (req, res) => {
  const { title, performer } = req.query;
  const songs = await songsRepositories.getSongs({ title, performer });
  return res.json({
    status: 'success',
    data: { songs },
  });
};

export const getSongById = async (req, res) => {
  const { id } = req.params;
  const song = await songsRepositories.getSongById(id);
  return res.json({
    status: 'success',
    data: { song },
  });
};

export const editSongById = async (req, res) => {
  const { id } = req.params;
  const { title, year, performer, genre, duration, albumId } = req.body;
  const song = await songsRepositories.editSongById(id, { title, year, performer, genre, duration, albumId });
  if (song) {
    return res.json({
      status: 'success',
      message: 'Berhasil mengubah song.',
    });
  }
};

export const deleteSongById = async (req, res) => {
  const { id } = req.params;
  const song = await songsRepositories.deleteSongById(id);
  if (song) {
    return res.json({
      status: 'success',
      message: 'Berhasil menghapus song',
    });
  }
};