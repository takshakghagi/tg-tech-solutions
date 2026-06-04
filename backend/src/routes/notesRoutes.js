const express = require('express');
const router  = express.Router();
const { getAllNotes, getNoteBySlug, downloadNote } = require('../controllers/notesController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.get('/',             optionalAuth, getAllNotes);
router.get('/:slug',        optionalAuth, getNoteBySlug);
router.post('/:id/download', protect, downloadNote);

module.exports = router;