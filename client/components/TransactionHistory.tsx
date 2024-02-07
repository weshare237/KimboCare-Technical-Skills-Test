import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
import { TransactionState } from '../context/TransactionContext';
import TransactionDetails from './TransactionDetails';

const style = {
  wrapper: `text-white select-none  flex-1 pt-14 flex items-end justify-end pb-12 overflow-auto px-8`,
};

const TransactionHistory = () => {
  const { isLoading, currentAccount, setTxCount } = TransactionState();
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    (async () => {
      if (!isLoading && currentAccount) {
        const query = `*[_type=='users' && _id=='${currentAccount}'] {
                       'transactionList': transactions[] -> {
                         txHash,  
                         toAddress, 
                         amount, 
                         timestamp
                       }|order(timestamp desc)
                     }`;

        const transactions = await client.fetch(query);
        setTransactionHistory(transactions[0].transactionList);
        setTxCount(transactions[0].transactionList.length);
      }
    })();
  }, [isLoading, currentAccount]);

  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory?.map((transaction: Transaction) => (
          <TransactionDetails
            transaction={transaction}
            key={transaction.txHash}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
