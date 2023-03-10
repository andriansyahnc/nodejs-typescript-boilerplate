import QueueWrapper from "./QueueWrapper";
import {Job} from "bull";

class CustomQueue extends QueueWrapper {

    name = 'webrand-message-queue';
    constructor() {
        super();
    }

    startQueue() {
        console.log(`starting queue: ${this.name}`);
        super.start(this.name);
    }

    async processQueue(job: Job): Promise<void> {
        const currentdate = new Date();
        console.log(`${currentdate.getMinutes()}:${currentdate.getSeconds()}; jobid: ${job.id}; data: ${JSON.stringify(job.data)}`);
    }
}

export default CustomQueue;