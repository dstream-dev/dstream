import { All, Controller, Request, Response, Next } from "@nestjs/common";
import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BaseAdapter } from "@bull-board/api/dist/src/queueAdapters/base";
import { ExpressAdapter } from "@bull-board/express";
import { getBullBoardQueues } from "./BullBoardQueue";

@Controller("/bullBoard")
export class BullBoardController {
  @All("*")
  admin(
    @Request() req: express.Request,
    @Response() res: express.Response,
    @Next() next: express.NextFunction,
  ) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath("/bullBoard");
    const queues = getBullBoardQueues();
    const router = serverAdapter.getRouter() as express.Express;
    const { addQueue } = createBullBoard({
      queues: [],
      serverAdapter,
    });
    queues.forEach((queue: BaseAdapter) => {
      addQueue(queue);
    });
    const entryPointPath = "/bullBoard/";
    req.url = req.url.replace(entryPointPath, "/");
    router(req, res, next);
  }
}
