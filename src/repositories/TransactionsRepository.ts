import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

type TransactionType = {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): { transactions: Transaction[]; balance: Balance } {
    const balance = this.getBalance();

    return { transactions: this.transactions, balance };
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, transaction) => {
        return accumulator + transaction.value;
      }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: TransactionType): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
