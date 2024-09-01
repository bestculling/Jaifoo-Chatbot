import express from 'express'
import cors from 'cors'
import { connect } from './utils/db.js';
import { port, CLIENT_URL } from './utils/config.js';
import uploadRoute from './routes/uploadRoute.js';
import chatRoute from './routes/chatRoute.js';

const app = express()

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}))

app.use(express.json());

app.use("/api", uploadRoute);
app.use("/api", chatRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
    connect();
    console.log("Server running on 3030");
});