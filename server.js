require('dotenv').config();
const express = require('express');
const path = require('path');
const publicRouter = require('./server/routers/public');
const restrictedRouter = require('./server/routers/restricted');
const authRouter = require('./server/routers/auth');

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || localhost;
const app = express();

app.use(express.json());

app.use('/public', publicRouter);
app.use('/restricted', restrictedRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(port, host, () => {
  console.log(`Express listening on port ${port}...`);
});
