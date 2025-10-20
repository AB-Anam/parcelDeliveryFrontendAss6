// src/types/parcel.ts
import { IUser } from "./user";

export interface IStatusLog {
  status: string;
  timestamp: string; // ISO string
  updatedBy?: string | IUser;
  note?: string;
}


export interface IParcel {
  _id: string;
  type: string;
  weight: number;
  senderId: IUser | string;    // populated User or string id
  receiverId: IUser | string;  // populated
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  trackingId: string;
  trackingEvents: IStatusLog[];
  createdAt: string;
  updatedAt: string;
}
