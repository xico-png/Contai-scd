import React, { useState } from 'react';
import type { TransactionType, Transaction } from '../types/transaction';

interface Props {
  onSubmit: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [type, setType] = useState<TransactionType>('credit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount) return;

    onSubmit({ amount, date, type });
    setAmount(0);
    setDate('');
    setType('credit');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Valor:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tipo:</label>
        <select value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
        </select>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TransactionForm;
