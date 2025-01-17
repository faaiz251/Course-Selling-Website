import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'; // For password hashing (if applicable)
import { getUserByEmail } from '@/lib/database'; // Hypothetical database utility

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // Restrict to POST requests
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Hypothetical function to fetch user by email from your database
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash); // Assuming hashed passwords
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a session token or JWT (depends on your authentication setup)
    const token = 'your-session-token-or-jwt'; // Replace with actual token generation logic

    // Return success response
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
