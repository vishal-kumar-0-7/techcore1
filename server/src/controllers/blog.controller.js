import prisma from '../lib/prisma.js';

const VALID_STATUSES = ['draft', 'published'];

function toSlug(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  // Titles with no latin characters would otherwise produce an empty slug
  return slug || `post-${Date.now().toString(36)}`;
}

// Public
export async function getPosts(req, res) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, category: true, tags: true, publishedAt: true, author: { select: { name: true } } },
    });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
}

export async function getPostBySlug(req, res) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { name: true } } },
    });
    if (!post || post.status !== 'published') return res.status(404).json({ error: 'Post not found.' });
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch post.' });
  }
}

// Admin
export async function getAllPosts(req, res) {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
}

export async function createPost(req, res) {
  const { title, content, excerpt, coverImage, category, tags } = req.body;
  if (!title || !content || !excerpt) return res.status(400).json({ error: 'title, content and excerpt are required.' });

  try {
    const slug = toSlug(title);
    const post = await prisma.blogPost.create({
      data: {
        title, slug, content, excerpt,
        coverImage: coverImage || null,
        category: category || 'Engineering',
        tags: tags || [],
        authorId: req.admin.id,
        status: 'draft',
      },
    });
    res.status(201).json(post);
  } catch (e) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'A post with this title already exists.' });
    res.status(500).json({ error: 'Failed to create post.' });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content, excerpt, coverImage, category, tags, status } = req.body;

  try {
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    const existing = await prisma.blogPost.findUnique({ where: { id }, select: { status: true } });
    if (!existing) return res.status(404).json({ error: 'Post not found.' });

    const data = {};
    // Keep the slug stable once a post is live so shared links keep working
    if (title) { data.title = title; if (existing.status !== 'published') data.slug = toSlug(title); }
    if (content) data.content = content;
    if (excerpt) data.excerpt = excerpt;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (category) data.category = category;
    if (tags) data.tags = tags;
    if (status) {
      data.status = status;
      // Only stamp publishedAt on the draft -> published transition
      if (status === 'published' && existing.status !== 'published') data.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({ where: { id }, data });
    res.json(post);
  } catch (e) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'A post with this title already exists.' });
    res.status(500).json({ error: 'Failed to update post.' });
  }
}

export async function deletePost(req, res) {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.json({ message: 'Post deleted.' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete post.' });
  }
}
