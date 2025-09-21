import mongoose, { Schema, Document } from "mongoose";

export interface IDropCable extends Document {
  external_id: string;
  code: string;
  isDrop: boolean;
}

const DropCableSchema: Schema = new Schema({
  external_id: { type: String, required: true },
  code: { type: String, required: true },
  isDrop: { type: Boolean, required: true },
});

const DropCable = mongoose.model<IDropCable>("DropCable", DropCableSchema);

export default DropCable;
