import Queue, {Job} from "bull";

const redisOptions = {
    redis: {
        host: "127.0.0.1",
        port: 6379,
    },
    limiter: {
        max: 10,
        duration: 30000
    }
};

abstract class QueueWrapper {
    queue?: Queue.Queue;

    start(queueName: string) {
        this.queue = new Queue(queueName, redisOptions);
        this.queue.process("*", (job: Job) => this.processQueue(job));
        this.queue.on("completed", async (job: Job) => this.completeQueue(job));
        this.queue.on("error", (error: Error) => this.erroredQueue(error));
        this.queue.on("failed", (job: Job, error: Error) => this.failedQueue(job, error));
    }

    async completeQueue(job: Job) {
        console.log(`${job.id} finished`);
        await job.remove()
    }

    erroredQueue(error: Error) {
        console.log(error.message);
    };

    failedQueue(job: Job, error: Error) {
        console.log(`${job.name} failed because of ${error.message}`);
    };

    abstract processQueue(job: Job): Promise<void>;
}

export default QueueWrapper;
