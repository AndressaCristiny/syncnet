import mongoose, { Schema, Document } from "mongoose";

export interface ICable extends Document {
  external_id: string;
  name: string;
  cableType: string;
  boxA: string | null;
  boxB: string | null;
  poles: { lat: number; lng: number }[];
}

const CableSchema: Schema = new Schema({
  external_id: { type: String, required: true },
  name: { type: String, required: true },
  cableType: { type: String, required: true },
  boxA: { type: String, default: null },
  boxB: { type: String, default: null },
  poles: { type: [{ lat: Number, lng: Number }], required: true },
});

const Cable = mongoose.model<ICable>("Cable", CableSchema);

export default Cable;
