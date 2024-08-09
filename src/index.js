import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Define a custom Morgan format with colors
morgan.token('status-colored', (req, res) => {
    const status = res.statusCode;
    const color =
        status >= 500 ? chalk.red : // red for server errors
            status >= 400 ? chalk.yellow : // yellow for client errors
                status >= 300 ? chalk.cyan : // cyan for redirects
                    status >= 200 ? chalk.green : // green for success
                        chalk.white; // white for others
    return color(status);
});

const vaultStyle = chalk.hex('#0A86C6')(':method') + ' ' + chalk.hex('#FFD700')(':url') + ' :status-colored :response-time ms';


// Use Morgan middleware with the custom format
app.use(morgan(vaultStyle));

// enable CORS with the whitelist
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from the Express TypeScript Server!');
});

app.listen(port, () => {
    console.log(`Express TypeScript Server is running on port ${port}`);
});

