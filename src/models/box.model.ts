import mongoose, { Schema, Document } from "mongoose";

export interface IBox extends Document {
  external_id: string;
  name: string;
  coords: number[];
  boxType: string;
}

const BoxSchema: Schema = new Schema({
  external_id: { type: String, required: true },
  name: { type: String, required: true },
  coords: { type: [Number], required: true },
  boxType: { type: String, required: true },
});

const Box = mongoose.model<IBox>("Box", BoxSchema);

export default Box;
