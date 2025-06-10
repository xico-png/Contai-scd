import React, { useState } from 'react';
import type { TransactionType, Transaction } from '../types/transaction';
import { Calendar, DollarSign, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [type, setType] = useState<TransactionType>('credit');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || amount <= 0) return;

    onSubmit({ amount, date, type, description });

    setAmount(0);
    setDate('');
    setType('credit');
    setDescription('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 bg-gray-900 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] space-y-6 text-white border border-gray-800"
    >
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Nova Transação
      </h2>

      {/* Valor */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <DollarSign size={18} /> Valor
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min={0.01}
          step="0.01"
          required
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        />
      </div>

      {/* Descrição */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <DollarSign size={18} /> Descrição
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
        />
      </div>

      {/* Data */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Calendar size={18} /> Data
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200"
        />
      </div>

      {/* Tipo */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          {type === 'credit' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />} Tipo
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
        >
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
        </select>
      </div>

      {/* Botão */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold shadow-lg transition duration-200"
      >
        Adicionar
      </motion.button>
    </motion.form>
  );
};

export default TransactionForm;
