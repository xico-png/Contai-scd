export type TransactionType = 'credit' | 'debit';

export interface Transaction {
  id?: string;
  amount: number;
  date: string;
  type: TransactionType;
}
