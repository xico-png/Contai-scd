import React, { useEffect, useState } from 'react';
import type { Transaction } from '../types/transaction';
import { fetchTransactions, createTransaction } from '../api/transactions';
import TransactionForm from '../components/transactionForm';

const Home: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions().then(setTransactions).catch(console.error);
  }, []);

  const handleAdd = async (newTx: Transaction) => {
    try {
      const savedTx = await createTransaction(newTx);
      setTransactions((prev) => [...prev, savedTx]);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    }
  };

  return (
    <div>
      <h1>Transações</h1>
      <TransactionForm onSubmit={handleAdd} />
      <ul>
        {transactions.map((tx, i) => (
          <li key={tx.id || i}>
            {tx.date} - {tx.type.toUpperCase()} - R${tx.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
