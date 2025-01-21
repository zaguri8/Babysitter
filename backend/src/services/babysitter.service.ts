import EventModel, { BabysitterEvent } from "../models/event.model";
import UserModel from "../models/user.model";

export async function getBabysitters() {
  return await UserModel.find({ isBabysitter: true });
}
export async function scheduleEvent(event: any) {
  const event_ = await EventModel.create(event);

  const guradian = await UserModel.findById(event.guardian).populate("guardianEvents");
  const babysitter = await UserModel.findById(event.babysitter).populate("babysitterEvents");
  if (guradian && !guradian.isBabysitter && babysitter && babysitter.isBabysitter) {
    for (var e of guradian.guardianEvents) {
      const _casted = e as any as BabysitterEvent;
      if (_casted.start > event.start && _casted.end < event.end) {
        throw new Error("Guardian already has an event scheduled at this time");
      }
    }

    for (var e of babysitter.babysitterEvents) {
      const _casted = e as any as BabysitterEvent;
      if (_casted.start > event.start && _casted.end < event.end) {
        throw new Error("Babysitter already has an event scheduled at this time");
      }
    }
  } else {
    throw new Error("Invalid guardian or babysitter");
  }
  await UserModel.findByIdAndUpdate(event.babysitter, { $push: { babysitterEvents: event_._id } });
  await UserModel.findByIdAndUpdate(event.guardian, { $push: { guardianEvents: event_._id } });
  return event_;
}

export async function deleteEvent(event: string) {
  const eventDeleted = await EventModel.findByIdAndDelete(event);
  await UserModel.findByIdAndUpdate(eventDeleted!.babysitter, { $pull: { babysitterEvents: eventDeleted!._id } });
  await UserModel.findByIdAndUpdate(eventDeleted!.guardian, { $pull: { guardianEvents: eventDeleted!._id } });
  return eventDeleted;
}
