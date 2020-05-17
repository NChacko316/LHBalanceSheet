export class Expense {
  _id?: string;
  expenseDate: Date;
  category: {
    code: string;
    category: string;
    type: string;
    description: string;
  };
  amount: number;
  transaction_type: string;
}
