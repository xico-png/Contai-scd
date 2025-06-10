import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type TransactionType = 'credit' | 'debit';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

 @Column({ type: 'varchar', default: '', nullable: false })
  description!: string;

  @Column('float')
  amount!: number;

  @Column()
  date!: string;

  @Column()
  type!: TransactionType;
}
