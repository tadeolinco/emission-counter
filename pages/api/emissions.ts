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
    const entries = await db.emissionEntry.findMany();
    if (type === 'scope') {
      const byScope: { [scope: number]: number } = { 1: 0, 2: 0, 3: 0 };
      for (const entry of entries) {
        byScope[entry.scope] += entry.emission;
      }
      res.status(200).json(byScope);
    }
    if (type === 'week') {
      const byDay: { [day: number]: number } = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
      for (const entry of entries) {
        const day = new Date(entry.date).getDay();
        byDay[day] += entry.emission;
      }
      res.status(200).json(byDay);
    }
  }
}
