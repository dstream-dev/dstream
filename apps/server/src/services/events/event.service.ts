import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { clickhouseClient } from "src/clickhouse";
import { CreateEventDTO } from "src/dtos";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class EventService {
  async formatDate(data: string) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  async createEvent(data: CreateEventDTO) {
    try {
      await clickhouseClient.insert({
        table: `events_${data.org_id}`,
        values: [
          {
            id: uuidv4(),
            org_id: data.org_id,
            customer_id: data.customer_id,
            event_name: data.event_name,
            properties: data.properties,
            created_at: await this.formatDate(new Date().toISOString()),
          },
        ],
        format: "JSONEachRow",
      });

      return {
        status: HttpStatus.OK,
        message: "Event created successfully",
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProperties(org_id: string) {
    try {
      const properties =
        (
          await (
            await clickhouseClient.query({
              query: `select DISTINCT 
            arrayMap(
              (k) -> tuple(k, JSONType(toJSONString(properties), k)),
              JSONExtractKeys(toJSONString(properties))
            ) as properties
            from default.events_${org_id}`,
              format: "JSONEachRow",
            })
          ).json()
        )[0]?.properties || [];

      const data: Array<{
        name: string;
        value: Array<string>;
        type: string;
      }> = [];

      for (const property of [...properties, ["event_name", "String"]]) {
        const values =
          property[1] === "Int64"
            ? []
            : await this.getPropertyValues(org_id, property[0]);
        data.push({
          name: property[0],
          value: values.values,
          type: property[1],
        });
      }

      return {
        properties: data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPropertyValues(org_id: string, property: string) {
    try {
      const val =
        property === "event_name" ? "event_name" : `properties.${property}`;

      const propertyValues: any = await (
        await clickhouseClient.query({
          query: `select ${val} as values from default.events_${org_id} GROUP BY ${val}`,
          format: "JSONEachRow",
        })
      ).json();

      return {
        values: propertyValues.map((item: any) => item.values),
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
