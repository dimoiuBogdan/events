import { HttpStatusCode } from "axios";

export type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  status?: HttpStatusCode;
};
