import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.id;

    if (req.method === 'DELETE') {
        const user = await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        })
        res.json(user)
    } else {
        console.log("not could be created ");
    }
}