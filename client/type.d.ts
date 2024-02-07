interface TransactionContextType {}

interface Transaction {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: Date;
}
