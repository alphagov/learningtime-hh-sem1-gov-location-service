import express, { Express, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { getConstituency } from './services/constituency.service';
import { getElectedRepresentative } from './services/electedRepresentative.service';

const app: Express = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nunjucks.configure('views', {
	autoescape: true,
	express: app,
});

app.get('/', (req: Request, res: Response) => {
	res.render('index.njk', { electedRepresentativeName: '', errorMessage: '' });
});

app.post('/', async (req: Request, res: Response) => {
	try {
		const constituency = await getConstituency(req.body.postcode);
		const electedRepresentativeName = await getElectedRepresentative(
			constituency
		);
		res.render('index.njk', {
			electedRepresentativeName: electedRepresentativeName,
		});
	} catch (error: any) {
		console.error(error);
		if (
			error.message === 'Postcode was not valid. Please submit a valid postcode'
		) {
			res.render('index.njk', {
				electedRepresentativeName: 'Error',
				errorMessage: `ERROR: ${error.message}`,
			});
		} else {
			res.render('index.njk', {
				electedRepresentativeName: 'Error',
				errorMessage: 'Something really bad went wrong with the server, sorry!',
			});
		}
	}
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
