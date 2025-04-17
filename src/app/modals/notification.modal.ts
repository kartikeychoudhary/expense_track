import { NOTIFICATION_TYPES } from "../constants/application.constant";

export interface Notification {
    message: string;
    type: NOTIFICATION_TYPES; // Use the enum for type
    duration?: number; // Optional duration in ms, defaults to 5000
}