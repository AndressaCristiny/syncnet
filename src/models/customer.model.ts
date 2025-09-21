import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  code: string;
  name: string;
  observation: string;
  external_id: string;
}

const CustomerSchema: Schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  observation: { type: String, required: true },
  external_id: { type: String, required: true },
});

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;
