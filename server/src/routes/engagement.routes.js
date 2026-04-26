import { Router } from 'express';
import { getEngagementPlans, getAllPlans, createPlan, updatePlan, deletePlan } from '../controllers/engagement.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getEngagementPlans);
router.get('/admin/all', requireAuth, getAllPlans);
router.post('/', requireAuth, createPlan);
router.patch('/:id', requireAuth, updatePlan);
router.delete('/:id', requireAuth, deletePlan);

export default router;
