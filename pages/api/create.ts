import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, name } = req.body;
    try {
        await prisma.user.create({
            data: {
                email,
                name
            }
        })
        res.status(200).json({ message: 'user Added' })
    } catch (error) {
        console.log(error);

    }
}