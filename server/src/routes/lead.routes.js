import { Router } from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/lead.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public
router.post('/', createLead);

// Admin protected
router.get('/', requireAuth, getLeads);
router.patch('/:id/status', requireAuth, updateLeadStatus);

export default router;
