require('dotenv').config();
const express = require('express');
const path = require('path');
const { inspectionTimeRouter, reservationRouter, roomRouter, timeslotRouter, userRouter } = require('./server/routers');

const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost';
const app = express();

app.use('/', inspectionTimeRouter);
app.use('/', reservationRouter);
app.use('/', roomRouter);
app.use('/', timeslotRouter);
app.use('/', userRouter);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(port, host, () => {
  console.log(`Express listening on port ${port}...`);
});
