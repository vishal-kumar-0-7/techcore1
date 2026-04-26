import { Router } from 'express';
import { getCaseStudies, getCaseStudyById, getAllCaseStudies, createCaseStudy, updateCaseStudy, deleteCaseStudy } from '../controllers/casestudy.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', getCaseStudies);
router.get('/:id', getCaseStudyById);

// Admin
router.get('/admin/all', requireAuth, getAllCaseStudies);
router.post('/', requireAuth, createCaseStudy);
router.patch('/:id', requireAuth, updateCaseStudy);
router.delete('/:id', requireAuth, deleteCaseStudy);

export default router;
