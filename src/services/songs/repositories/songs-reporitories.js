import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import { NotFoundError } from '../../../exceptions/index.js';

class SongsRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };
    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    let query = 'SELECT id, title, performer FROM songs';
    const conditions = [];
    const values = [];
    if (title) {
      conditions.push(
        `LOWER(title) LIKE LOWER($${conditions.length + 1})`,
      );
      values.push(`%${title}%`);
    }
    if (performer) {
      conditions.push(
        `LOWER(performer) LIKE LOWER($${conditions.length + 1})`,
      );
      values.push(`%${performer}%`);
    }
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await this._pool.query({ text: query, values });
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Song Tidak ditemukan');
    }

    return result.rows[0];
  }

  async editSongById(id, { title, year, performer, genre, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal mengubah songs. Id tidak ditemukan');
    }
    return result.rows[0];
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus song. Id tidak ditemukan');
    }
    return result.rows[0];
  }
}

export default SongsRepositories;