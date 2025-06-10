export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
}
