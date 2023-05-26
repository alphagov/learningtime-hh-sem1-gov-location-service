import express, { Express, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';

const app: Express = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
	console.log(req.body.postcode);
	res.render('index.njk');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
