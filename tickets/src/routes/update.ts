import { NotAutorizedError, NotFoundError, requireAuth, validateRequest } from "@tixmix/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router: Router = Router();

router.put(
  "/api/tickets/:id", [
    requireAuth,
    body("title").not().isEmpty().withMessage("title is requried"),
    body("price").isFloat({gt: 0}).withMessage("message is required and greater than 0")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAutorizedError();
    }

    ticket.set({title: req.body.title, price: req.body.price});
    await ticket.save();
    
    res.status(202).send(ticket);
  }
);

export { router as updateTicketRouter };
