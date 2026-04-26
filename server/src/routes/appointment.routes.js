import { Router } from 'express';
import { createAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointment.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createAppointment);
router.get('/', requireAuth, getAppointments);
router.patch('/:id/status', requireAuth, updateAppointmentStatus);

export default router;
