const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => console.log('Database connection successful'));

const port = 5000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});