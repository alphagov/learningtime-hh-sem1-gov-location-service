import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
	console.log('Hello, client has sent get request');
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
