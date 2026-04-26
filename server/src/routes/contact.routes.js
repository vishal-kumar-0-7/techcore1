import { Router } from 'express';
import { createContact, getContacts, updateContactStatus } from '../controllers/contact.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public
router.post('/', createContact);

// Admin protected
router.get('/', requireAuth, getContacts);
router.patch('/:id/status', requireAuth, updateContactStatus);

export default router;
