import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db';
import config from './config/config';
import userModel from './models/user';
import clientRouter from './routes/client';
import usersRouter from './routes/user';
import authRouter from './routes/auth';
import authorization from './auth';
import clientDal from './dal/client';
import userDal from './dal/user';

const app = express();
app.config = config;
app.modelsUsers = userModel;
app.dalClient = clientDal;
app.dalUser = userDal;

const auth = authorization(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.redirect('/apidoc');
});

app.auth = auth;

clientRouter(app);
usersRouter(app);
authRouter(app);

export default app;




