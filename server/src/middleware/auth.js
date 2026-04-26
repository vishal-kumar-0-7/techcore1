import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  // Read token from HttpOnly cookie
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

export function requireSuperAdmin(req, res, next) {
  if (req.admin?.role !== 'super_admin') {
    return res.status(403).json({ error: 'Forbidden.' });
  }
  next();
}
