// src/types/parcel.ts
import { IUser } from "./user";

export interface IStatusLog {
  status: string;
  timestamp: string; // ISO string
  updatedBy?: string | IUser;
  note?: string;
}


export interface IParcel {
  _id?: string;
  type: string;
  weight: number;
  senderId?: string;
  receiverId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  fee?: number;              // ✅ Add this
  status: string;
  trackingId: string;
  trackingEvents?: {
    status: string;
    timestamp: string;
    updatedBy?: string;
    note?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
