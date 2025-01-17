import type { NextApiRequest, NextApiResponse } from 'next'
import { Signin }  from '@/pages/signin'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;
    Signin('credentials', { email, password });
  
    res.status(200).json({ success: true });
  } catch (error) {
    // Narrow down the type of error
    if (error instanceof Error && error.name === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}