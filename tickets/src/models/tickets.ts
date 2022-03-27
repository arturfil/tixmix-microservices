import { model, Schema, Document, Model } from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketDoc extends Document {
    title: string;
    price: number;
    userId: string;
}

interface TicketModel extends Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    userId: {type: String, required: true}
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

TicketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

export const Ticket = model<TicketDoc, TicketModel>('Ticket', TicketSchema)