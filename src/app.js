const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const fileUpload = require('express-fileupload');
const bearerToken = require('express-bearer-token');

// Instância do app
const app = express();

// Habilita o log
app.use(morgan('dev'));

// Habilita cors
app.use(cors());

//Habilita o fileupload
app.use(fileUpload());

//token
app.use(bearerToken());

// Configura o body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega o mongoose
mongoose.connect(config.database);

// Busca a conexão com mongoose
const db = mongoose.connection;

// Mostra possiveis erros.
db.on('error', console.error.bind(console, 'Falha na conexão com banco de dados: '));

// Carrega as rotas
const mainRoute = require('./app-router');
const voterRoute = require('./voter/voter-route')
const importXlsRoute = require('./import-xls/import-xls-router');
const userRouter = require('./user/user-router');
const authRouter = require('./auth/auth-router');

app.use('/', mainRoute);
app.use('/voter', voterRoute);
app.use('/importxls', importXlsRoute);
app.use('/user', userRouter);
app.use('/auth', authRouter);

module.exports = app;