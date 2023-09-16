
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from  '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const noteId = req.query.id

	if(req.method === 'DELETE') {
		const post = await prisma.post.delete({
			where: {id: Number(noteId)}
		})
		res.json(post)
		console.log("Delete Successfully");
	} else {
		console.log("Delete Failed");
	}

    if(req.method === 'PUT') {
        const {title,content} = req.body;
		const post = await prisma.post.update({
			where: {id: Number(noteId)},
            data: {
                'title':title,
                'content':content
              },
		})
		res.json(post)
		console.log("Update Successfully");
	} else {
		console.log("Update Failed");
	}
}