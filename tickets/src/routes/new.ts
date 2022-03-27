import { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from '@tixmix/common';
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router:Router = Router();

router.post("/api/tickets", requireAuth, [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({gt: 0}).withMessage("Price gt to zero, is required"),
], validateRequest, async (req: Request, res: Response) => {
    const { price, title } = req.body;
    try {
        const ticket = Ticket.build({title, price, userId: req.currentUser!.id})
        await ticket.save()
        res.status(201).send(ticket);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export { router as createTicketRouter };