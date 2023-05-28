import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { CreateEventDTO } from "src/dtos";
import { EventService } from "./event.service";

@Processor("event")
export class EventProcessor extends WorkerHost {
  constructor(private readonly eventService: EventService) {
    super();
  }

  async process(job: Job) {
    try {
      const { data }: { data: CreateEventDTO } = job;
      const newObject = {};

      for (const [key, value] of Object.entries(data.properties)) {
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean" ||
          typeof value === "bigint"
        ) {
          newObject[key] = value;
        }
      }

      await this.eventService.createEvent({
        org_id: data.org_id,
        customer_id: data.customer_id,
        event_name: data.event_name,
        properties: newObject,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
