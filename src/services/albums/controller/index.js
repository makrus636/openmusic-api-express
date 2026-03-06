import albums from '../albumsjs';

export const getAlbums = (req, res) => {
  return res.json({
    data: { albums },
  });
};