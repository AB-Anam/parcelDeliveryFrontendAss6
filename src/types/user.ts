// src/types/user.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "sender" | "receiver";
  blocked?: boolean;
  createdAt?: string; // Added for dashboard display
}
