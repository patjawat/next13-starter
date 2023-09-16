import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // กุงข้อมูล
    if (req.method === 'GET') {
        const id = req.query.id
        try {
           
                const data = await prisma.user.findMany()
                return res.status(200).json(data);
        
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // สร้างใหม่
    if (req.method === 'POST') {

        const { email, name } = req.body;
        try {
            await prisma.user.create({
                data: {
                    email: email,
                    name: name
                }
            })
            return res.status(200).json({ massage: 'create user Success' })
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }

    }

}