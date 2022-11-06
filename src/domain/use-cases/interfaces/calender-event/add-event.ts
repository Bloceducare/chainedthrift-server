import { ICalenderEvent } from "../../../entities/calender-event";

export interface IAddCalenderEvent {
    execute(event: ICalenderEvent[], auth: any): Promise<boolean>;
}
