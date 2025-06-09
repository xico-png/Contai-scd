import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // use false em produção
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
