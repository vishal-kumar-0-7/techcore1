// Create an admin account from the command line.
// Usage: npm run create-admin
import readline from 'node:readline/promises';
import bcrypt from 'bcrypt';
import prisma from '../src/lib/prisma.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

try {
  const name = (await rl.question('Name: ')).trim();
  const email = (await rl.question('Email: ')).trim();
  const password = await rl.question('Password (min 8 chars): ');

  if (!name || !email || password.length < 8) {
    throw new Error('Name, email and a password of at least 8 characters are required.');
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) throw new Error(`An admin with email ${email} already exists.`);

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.create({
    data: { name, email, passwordHash, role: 'super_admin' },
  });

  console.log(`Admin created: ${admin.email} (id ${admin.id})`);
} catch (error) {
  console.error('Failed to create admin:', error.message);
  process.exitCode = 1;
} finally {
  rl.close();
  await prisma.$disconnect();
}
