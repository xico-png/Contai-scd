import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
   host: process.env.DB_HOST || 'localhost',

  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'contai_db',
  synchronize: true, // use false em produção
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
  
});
