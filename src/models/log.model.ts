import mongoose, { Schema } from "mongoose";

export interface ILog {
  level: string;
  message: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  level: {
    type: String,
    required: true,
    enum: ["INFO", "WARN", "ERROR", "SUCESS"],
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model<ILog>("Log", LogSchema);

export default Log;
