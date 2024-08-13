import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './config/ormconfig';
import noteRoutes from './routes/noteRoutes';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', noteRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Note API!');
});

// Start the server and connect to the database
const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const PORT = process.env.PORT || 6000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error during Data Source initialization:', err);
    }
};

startServer();
