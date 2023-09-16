
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id

	if (req.method === 'GET') {
		const post = await prisma.user.findFirst({
			where: { id: Number(id) }
		})
		res.json(post)
		console.log("Delete Successfully");
	} else {
		console.log("Delete Failed");
	}

	if (req.method === 'PUT') {
		const { email, name } = req.body;
		const post = await prisma.user.update({
			where: { id: Number(id) },
			data: {
				'email': email,
				'name': name
			},
		})
		res.json(post)
		console.log("Update Successfully");
	} else {
		console.log("Update Failed");
	}

	if (req.method === 'DELETE') {
		const post = await prisma.user.delete({
			where: { id: Number(id) }
		})
		res.json(post)
		console.log("Delete Successfully");
	} else {
		console.log("Delete Failed");
	}
}