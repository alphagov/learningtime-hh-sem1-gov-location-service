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
	res.render('index.njk', { electedRepresentativeName: '' });
});

app.post('/', async (req: Request, res: Response) => {

	try {
		const response = await fetch(
			`https://api.postcodes.io/postcodes/${req.body.postcode}`
		);
		const responseJson: any = await response.json();
		const parliamentaryConstituency =
			responseJson.result.parliamentary_constituency;

		const electedRepresentativeRes = await fetch(
			`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${parliamentaryConstituency}&skip=0&take=20`
		);
		const electedRepresentativeJson: any =
			await electedRepresentativeRes.json();
		const electedRepresentativeName =
			electedRepresentativeJson.items[0].value.currentRepresentation.member
				.value.nameFullTitle;
		res.render('index.njk', {
			electedRepresentativeName: electedRepresentativeName,
		});
	} catch (error: unknown) {
		console.error(error);
		res.render('index.njk', {
			electedRepresentativeName: 'There was an error!',
		});
	}
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
