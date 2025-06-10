import React, { useEffect, useState } from 'react';
import type { Transaction } from '../types/transaction';
import TransactionForm from '../components/transactionForm';
import './styles/global.css';
import { formatMonthYear } from '../utils/formatters';
import { createTransaction, fetchTransactions } from '../services/transactionsService';

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

  const groupTransactions = (
    transactions: Transaction[]
  ): [string, [string, Transaction[]][]][] => {
    const yearGroups: { [year: string]: { [month: string]: Transaction[] } } = {};
  
    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
  
      if (!yearGroups[year]) yearGroups[year] = {};
      if (!yearGroups[year][month]) yearGroups[year][month] = [];
      yearGroups[year][month].push(tx);
    });
  
    return Object.entries(yearGroups)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, months]) => [
        year,
        Object.entries(months).sort((a, b) => Number(b[0]) - Number(a[0])),
      ]);
  };

  const grouped = groupTransactions(transactions);

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="page-title">Cont-Ai System</h1>

        <TransactionForm onSubmit={handleAdd} />

        <div className="transaction-list">
          {grouped.map(([year, months]) => (
            <div key={year} className="year-group">
              <h2 className="text-3xl text-blue-300 font-bold my-6">{year}</h2>

              {months.map(([month, txs]) => {
                const key = `${year}-${month}`;
                return (
                  <div key={key} className="transaction-group">
                    <h3 className="group-title">{formatMonthYear(key)}</h3>

                    <div className="table-wrapper">
                      <table className="transaction-table">
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {txs
                            .sort((a, b) => b.date.localeCompare(a.date))
                            .map((tx, index) => (
                              <tr key={tx.id || index}>
                                <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                                <td>{tx.description || 'sem descrição'}</td>
                                <td className={tx.type === 'credit' ? 'credit' : 'debit'}>
                                  {tx.type === 'credit' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                                </td>
                                <td className={tx.type === 'credit' ? 'credit' : 'debit'}>
                                  {tx.type === 'credit' ? 'Crédito' : 'Débito'}
                                </td>
                              </tr>
                            ))}

                          {/* Totais mensais */}
                          <tr className="font-semibold border-t border-gray-600">
                            <td colSpan={2}>Totais do mês:</td>
                            <td className="credit">
                              + R$ {txs.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                            </td>
                            <td className="debit">
                              - R$ {txs.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {grouped.length === 0 && (
            <p className="no-transactions">Nenhuma transação registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
