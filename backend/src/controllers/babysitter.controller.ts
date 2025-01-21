import { Request, Response } from "express";
import * as BabysitterService from "../services/babysitter.service";

export async function getBabysitters(request: Request, response: Response) {
  const babysitters = await BabysitterService.getBabysitters();
  return response.status(200).json({
    data: babysitters,
    status: 200,
    message: "Baby sitters fetched successfully",
  });
}

export async function scheduleEvent(request: Request, response: Response) {
  try {
    const event = await BabysitterService.scheduleEvent(request.body);
    return response.status(200).json({
      data: event,
      status: 200,
      message: "Event scheduled successfully",
    });
  } catch (error: any) {
    return response.status(400).json({
      status: 400,
      error,
      message: error.message,
    });
  }
}

export async function deleteEvent(request: Request, response: Response) {
  try {
    const event = await BabysitterService.deleteEvent(request.body);
    return response.status(200).json({
      data: event,
      status: 200,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    return response.status(400).json({
      status: 400,
      error,
      message: error.message,
    });
  }
}
