import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import CustomQueue from "./src/shared/queue/CustomQueue";
import CustomSubscriber from "./src/shared/pubsub/CustomSubscriber";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {

    const subscriber = new CustomSubscriber();
    subscriber.start();

    const queue = new CustomQueue();
    queue.startQueue();

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});