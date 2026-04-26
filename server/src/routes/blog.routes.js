import { Router } from 'express';
import { getPosts, getPostBySlug, getAllPosts, createPost, updatePost, deletePost } from '../controllers/blog.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Admin routes MUST come before /:slug to avoid being swallowed
router.get('/admin/all', requireAuth, getAllPosts);
router.post('/', requireAuth, createPost);
router.patch('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

// Public
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

export default router;
