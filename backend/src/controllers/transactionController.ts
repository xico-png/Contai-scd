import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Transaction } from '../entities/transaction';

const transactionRepo = AppDataSource.getRepository(Transaction);

export const getTransactions = async (_req: Request, res: Response) => {
  const transactions = await transactionRepo.find();
  res.json(transactions);
};

export const createTransaction = async (req: Request, res: Response): Promise<any> => {
  const { amount, date, type } = req.body;

  if (!amount || !date || !type) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  try {
    const transaction = transactionRepo.create({ amount, date, type });
    await transactionRepo.save(transaction);
    return res.status(201).json(transaction); // ✅ COM return
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar transação' }); // ✅ COM return
  }

};
