import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

type Request = {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    const insufficientFunds = value > total;

    if (type === 'outcome' && insufficientFunds) {
      throw new Error('Saldo insuficiente para realizar a transação');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
