
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma'
import { hash } from "bcryptjs";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { name, email, password } = req.body;
    const hashed_password = await hash(password, 12);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashed_password,
            }
        })
        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
            },
        })
        // return res.json(req.body);

    } catch (error) {
        console.log('Error creating');


    }


}
// import { prisma } from "@/lib/prisma";
// import { hash } from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = (await req.json()) as {
//       name: string;
//       email: string;
//       password: string;
//     };
//     const hashed_password = await hash(password, 12);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email: email.toLowerCase(),
//         password: hashed_password,
//       },
//     });

//     return NextResponse.json({
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         status: "error",
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }
