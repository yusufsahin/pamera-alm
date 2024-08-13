import { DataSource } from 'typeorm';
import { Note } from '../models/Note';

export const AppDataSource = new DataSource({
    type: 'mongodb',
    database: 'myapp',
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: [Note],
    url: process.env.MONGO_URI,
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
