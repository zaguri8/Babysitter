import mongoose, { ObjectId, Schema } from "mongoose";

export interface BabysitterEvent {
  _id: string;
  babysitter: ObjectId;
  guardian: ObjectId;
  start: Date;
  end: Date;
}

const EventSchema = new Schema<BabysitterEvent>({
  babysitter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  guardian: { type: Schema.Types.ObjectId, ref: "User", required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const EventModel = mongoose.model<BabysitterEvent>("Event", EventSchema);
export default EventModel;
