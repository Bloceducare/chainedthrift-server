import { calendar_v3 } from "googleapis";
import { googleCalender } from "../../../infrastructure/googleCalender";
import { ICalenderEvent } from "../../entities/calender-event";
import { IAddCalenderEvent } from "../interfaces/calender-event/add-event";

class AddCalenderEvent implements IAddCalenderEvent {
    private googleCalender: calendar_v3.Calendar;

    constructor(googleCalender: calendar_v3.Calendar) {
        this.googleCalender = googleCalender;
    }
    async execute(events: ICalenderEvent[], auth: any): Promise<boolean> {
        try {
            events.forEach(async (event: ICalenderEvent) => {
                await this.googleCalender.events.insert({
                    auth,
                    calendarId: "primary",
                    requestBody: event,
                });

                // if (response["status"] == 200 && response["statusText"] === "OK") {
                //     return true;
                // } else {
                //     return false;
                // }
            });
            return true;
        } catch (error) {
            console.log(`Error at insertEvent --> ${error}`);
            return false;
        }
    }
}

export const addCalenderEvent = new AddCalenderEvent(googleCalender);
