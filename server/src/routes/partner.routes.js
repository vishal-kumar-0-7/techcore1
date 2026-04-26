import { Router } from 'express';
import { createPartnerApplication, getPartnerApplications, updatePartnerStatus } from '../controllers/partner.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createPartnerApplication);
router.get('/', requireAuth, getPartnerApplications);
router.patch('/:id/status', requireAuth, updatePartnerStatus);

export default router;
