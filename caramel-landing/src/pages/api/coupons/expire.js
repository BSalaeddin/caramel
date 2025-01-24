import prisma from "../../../../prisma/lib/prisma";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { ids } = req.body;

        try {
            const updatedCoupons = await prisma.coupon.updateMany({
                where: { id: { in: ids } },
                data: {
                    expired: true,
                    expiry: new Date().toISOString(),
                },
            });

            res.status(200).json({ count: updatedCoupons.count });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error marking coupons as expired.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
