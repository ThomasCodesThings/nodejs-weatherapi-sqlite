import express from 'express';
import bodyParser from 'body-parser';
import { createTableIfNotExists } from './db/knex.js';
import weatherRouter from './routes/weather.js';

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(createTableIfNotExists('WeatherData')) {
    console.log('Sqlite3 database started');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

app.use('/api/weather', weatherRouter);

export default app;
