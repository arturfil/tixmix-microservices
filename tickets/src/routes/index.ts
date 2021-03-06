import { Request, Response, Router } from "express";
import { Ticket } from "../models/tickets";

const router:Router = Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
    const tickets = await Ticket.find();
    res.send(tickets);
});

export {router as  indexTicketRouter};