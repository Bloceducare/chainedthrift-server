export interface ICalenderTime {
    dateTime: any;
}
export interface ICalenderEvent {
    summary: string;
    description: string;
    location: string;
    colorId: string;
    start: ICalenderTime;
    end: ICalenderTime;
}
