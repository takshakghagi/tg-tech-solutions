// backend/src/routes/portfolioRoutes.js
const express = require('express');
const router  = express.Router();
const {
  getWebsites, getProjects, getDocs,
  adminGetWebsites, adminCreateWebsite, adminUpdateWebsite, adminDeleteWebsite,
  adminGetProjects, adminCreateProject, adminUpdateProject, adminDeleteProject,
  adminGetDocs,    adminCreateDoc,    adminUpdateDoc,    adminDeleteDoc,
} = require('../controllers/portfolioController');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// ── Public routes ──
router.get('/websites', getWebsites);
router.get('/projects', getProjects);
router.get('/docs',     getDocs);

// ── Admin routes ──
router.get   ('/admin/websites',     protect, adminOnly, adminGetWebsites);
router.post  ('/admin/websites',     protect, adminOnly, adminCreateWebsite);
router.put   ('/admin/websites/:id', protect, adminOnly, adminUpdateWebsite);
router.delete('/admin/websites/:id', protect, adminOnly, adminDeleteWebsite);

router.get   ('/admin/projects',     protect, adminOnly, adminGetProjects);
router.post  ('/admin/projects',     protect, adminOnly, adminCreateProject);
router.put   ('/admin/projects/:id', protect, adminOnly, adminUpdateProject);
router.delete('/admin/projects/:id', protect, adminOnly, adminDeleteProject);

router.get   ('/admin/docs',         protect, adminOnly, adminGetDocs);
router.post  ('/admin/docs',         protect, adminOnly, adminCreateDoc);
router.put   ('/admin/docs/:id',     protect, adminOnly, adminUpdateDoc);
router.delete('/admin/docs/:id',     protect, adminOnly, adminDeleteDoc);

module.exports = router;