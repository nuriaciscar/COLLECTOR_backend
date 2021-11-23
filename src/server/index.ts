import Debug from "debug";

const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');

const debug = Debug('collector:server');
const cors = require('cors');

const app = express();
app.use(cors);

const initializeServer = (port) => new Promise((resolve, reject) => {
  const server = app.listen(port, () => {
    debug(chalk.green(`Listening to port ${port}`));
    resolve(server);
  });

  server.on('error', (error) => {
    debug(chalk.red('Error to initialize Server'));
    if (error.code === 'EADDRINUSE') {
      debug(chalk.red(`Port ${port} is already in use.`));
      reject();
    }

    debug(chalk.red(error.code));
  });

  server.on('close', () => {
    debug(chalk.blue('Server disconnected, see you soon'));
  });
});

app.use(morgan('dev'));
app.use(express.json());

export { initializeServer, app }
