import {application, Router} from 'express';
import {BASE_URL, FACTION_CONTACT, FACTION_NAME} from '../constants.js';

const {chief} = application;
const router = new Router();

router.get('/osuplace', async (req, res) => {
    const [order] = await chief.sql`SELECT *
                                    FROM orders
                                    ORDER BY created_at DESC
                                    LIMIT 1;`;

    res.json({
        faction: FACTION_NAME,
        contact: FACTION_CONTACT,
        templates: order ? [
            {
                name: order.message ?? 'Latest orders',
                sources: [
                    `${BASE_URL}/orders/${order.id}.png`
                ],
                x: order.offset_x + 1500,
                y: order.offset_y + 1000
            }
        ] : []
    });
});

export default router;
