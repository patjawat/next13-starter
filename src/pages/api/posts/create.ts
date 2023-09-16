import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from   '@/lib/prisma'
export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    const {title,content} = req.body;

    try {
            await prisma.post.create({
                data:{
                    'title':title,
                    'content':content
                }
            })
            res.status(200).json({ message: 'Create Success' })
            
        } catch (error) {
        console.log('Error creating');
        
        
    }


}