import { NotFoundError, requireAuth, validateRequest } from "@tixmix/common";
import { Request, Response, Router } from "express";
import { Ticket } from "../models/tickets";

const router: Router = Router();

router.put(
  "/api/tickets/:id",
  [requireAuth],
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
