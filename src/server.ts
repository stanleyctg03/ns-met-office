import express from 'express';
import { getForecastForPostCode } from "./forecast.ts";
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.get("/", async (req, res) => {
    console.log('Ready to accept request');
})

app.get("/forecast/:postcode", async (req, res) => {
    try {
        const forecast = await getForecastForPostCode(req.params.postcode);
        res.json(forecast);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(8080, () => console.log(`Server started on port 8080`));