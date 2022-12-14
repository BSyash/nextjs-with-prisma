import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, email } = req.body;
    try {
        await prisma.user.update({
            where: { id: id },
            data: {
                email,
                name,
                id
            }
        })
        res.status(200).json({ message: 'user Updated' })
    } catch (error) {
        console.log(error);

    }
}