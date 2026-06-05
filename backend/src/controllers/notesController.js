const { pool }    = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

const getAllNotes = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)   || 1;
    const limit  = parseInt(req.query.limit)  || 9;
    const offset = (page - 1) * limit;
    const course  = req.query.course  || '';
    const search  = req.query.search  || '';
    const is_free = req.query.is_free || '';

    let query  = `SELECT id, title, slug, subject, description,
                  course, semester, price, is_free, thumbnail,
                  file_size, total_pages, language, downloads,
                  rating, created_at
                  FROM notes WHERE is_active = 1`;
    let countQ = 'SELECT COUNT(*) AS total FROM notes WHERE is_active = 1';
    const params      = [];
    const countParams = [];

    if (course) {
      query  += ' AND course = ?';
      countQ += ' AND course = ?';
      params.push(course);
      countParams.push(course);
    }

    if (is_free === 'true') {
      query  += ' AND is_free = 1';
      countQ += ' AND is_free = 1';
    }

    if (search) {
      query  += ' AND (title LIKE ? OR subject LIKE ?)';
      countQ += ' AND (title LIKE ? OR subject LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY downloads DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [notes] = await pool.query(query, params);
    const [count] = await pool.query(countQ, countParams);

    return ApiResponse.paginated(res, notes, {
      page,
      limit,
      total: count[0].total,
      pages: Math.ceil(count[0].total / limit)
    });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getNoteBySlug = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE slug = ? AND is_active = 1',
      [req.params.slug]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'Note not found.');

    const note = { ...rows[0] };
    if (!note.is_free) delete note.file_url;

    return ApiResponse.success(res, { note });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const downloadNote = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM notes WHERE id = ? AND is_active = 1',
      [Number(req.params.id)]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'Note not found.');

    const note = rows[0];

    if (!note.is_free) {
      const [purchased] = await pool.query(
        'SELECT id FROM user_downloads WHERE user_id = ? AND note_id = ?',
        [req.user.id, note.id]
      );
      if (!purchased.length) {
        return ApiResponse.forbidden(res, 'Please purchase this note first.');
      }
    }

    await pool.query(
      'UPDATE notes SET downloads = downloads + 1 WHERE id = ?',
      [note.id]
    );

    await pool.query(
      `INSERT INTO user_downloads (user_id, note_id, download_count, last_downloaded)
       VALUES (?, ?, 1, NOW())
       ON DUPLICATE KEY UPDATE
       download_count = download_count + 1,
       last_downloaded = NOW()`,
      [req.user.id, note.id]
    );

    return ApiResponse.success(res, { download_url: note.file_url }, 'Download ready!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = { getAllNotes, getNoteBySlug, downloadNote };