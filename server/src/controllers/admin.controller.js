import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set HttpOnly cookie — browser sends it automatically, JS can't read it
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed.' });
  }
}

export async function getMe(req, res) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!admin) return res.status(401).json({ error: 'Admin not found.' });
    res.json(admin);
  } catch {
    res.status(500).json({ error: 'Failed to get session.' });
  }
}

export async function logout(req, res) {
  res.clearCookie('admin_token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out.' });
}

// Utility: run this once to seed your first admin account
// POST /api/admin/seed  (remove this route after first use)
export async function seedAdmin(req, res) {
  const { name, email, password } = req.body;

  try {
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Admin already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.create({
      data: { name, email, passwordHash, role: 'super_admin' },
    });

    res.status(201).json({ message: 'Admin created.', id: admin.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin.' });
  }
}
