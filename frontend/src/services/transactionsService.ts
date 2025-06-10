import type { Transaction } from '../types/transaction';

const API_URL = 'http://localhost:3000/api/transactions'; // ajuste para seu backend // normalmente .env

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });

  if (!response.ok) {
    throw new Error('Erro ao criar transação');
  }

  return response.json();
}
