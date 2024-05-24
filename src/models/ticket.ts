import { Document, Model, Schema, model } from "mongoose";

interface EntityAttrs {
  title: string,
  price: number,
  userId: string,
}

interface EntityDoc extends Document {
  title: string,
  price: number,
  userId: string,
}

interface EntityModel extends Model<EntityDoc> {
  build(attrs: EntityAttrs): EntityDoc;
}

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

schema.statics.build = (attrs: EntityAttrs): EntityDoc => {
  return new Ticket(attrs);
}

const Ticket = model<EntityDoc, EntityModel>('Ticket', schema);

export { Ticket };