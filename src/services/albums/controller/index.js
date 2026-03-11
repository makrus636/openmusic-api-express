import AlbumsRepositories from '../repositories/albums-repositories.js';

export const getAlbums = async (req, res) => {
  const albumsRepositories = new AlbumsRepositories();
  const albums = await albumsRepositories.getAlbums();
  res.json({
    status: 'success',
    data: {
      albums,
    },
  });
};

export const getAlbumById = async (req, res) => {
  const { id } = req.params;
  const albumsRepositories = new AlbumsRepositories();
  const album = await albumsRepositories.getAlbumById(id);
  res.json({
    status: 'success',
    data: {
      album,
    },
  });
};

export const addAlbum = async (req, res) => {
  const { name, year } = req.body;
  const albumsRepositories = new AlbumsRepositories();
  const albumId = await albumsRepositories.addAlbum({ name, year });
  res.status(201).json({
    status: 'success',
    data: {
      albumId,
    },
  });
};

export const editAlbumById = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  const albumsRepositories = new AlbumsRepositories();
  const albumId = await albumsRepositories.editAlbumById(id, { name, year });
  res.json({
    status: 'success',
    message: 'Album berhasil diperbarui',
    data: {
      albumId,
    },
  });
};

export const deleteAlbumById = async (req, res) => {
  const { id } = req.params;
  const albumsRepositories = new AlbumsRepositories();
  const albumId = await albumsRepositories.deleteAlbumById(id);
  res.json({
    status: 'success',
    message: 'Album berhasil dihapus',
    data: {
      albumId,
    },
  });
};

