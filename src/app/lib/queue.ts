import Queue from "bull";
import redis from "@/config/redis";

import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => {
  if (!redis.host || !redis.port)
    throw new Error("Redis connection info not found");

  const queue = {
    bull: new Queue(job.key, { redis }),
    name: job.key,
    handle: job.handle.bind(job),
  };

  return queue;
});

export default {
  queues,
  add(name: string, data: unknown) {
    const queue = this.queues.find((queue) => queue.name == name);

    return queue?.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      void queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("[Job Failed]: ", job.name, job.data);
        console.log(err);
      });
    });
  },
};
