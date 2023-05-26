import express, { Express, Request, Response } from 'express';
import nunjucks from 'nunjucks';

const app: Express = express();
const port = 8000;

nunjucks.configure('views', {
	autoescape: true,
	express: app,
});

app.get('/', (req: Request, res: Response) => {
	console.log('Hello, client has sent get request');
	res.render('index.njk');
});

app.post('/', (req: Request, res: Response) => {
	console.log('POST request received from client');
	res.render('index.njk');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
