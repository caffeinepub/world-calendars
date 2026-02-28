import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CalendarEntry {
    id: string;
    nativeName: string;
    displayName: string;
    locale: string;
    description: string;
}
export interface backendInterface {
    getAllCalendarEntries(): Promise<Array<CalendarEntry>>;
}
