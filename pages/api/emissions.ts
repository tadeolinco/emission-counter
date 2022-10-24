// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from 'api/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const entry = await db.emissionEntry.create({
      data: req.body,
    });

    res.status(200).json(entry);
  }

  if (req.method === 'GET') {
    const type = req.query.type;
  }
}
