import React from 'react';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import truncateEthAddress from 'truncate-eth-address';

const style = {
  wrapper: `text-white select-none  flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
};

interface Props {
  transaction: Transaction;
}

const TransactionDetails = ({ transaction }: Props) => {
  return (
    <div className={style.txHistoryItem}>
      <div className={style.txDetails}>
        <Image src='/assets/eth.png' height={20} width={15} alt='ethereum' />
        {transaction.amount} sent to{' '}
        <span className={style.toAddress}>
          {truncateEthAddress(transaction.toAddress)} ...
        </span>
      </div>{' '}
      on{' '}
      <div className={style.txTimestamp}>
        {new Date(transaction.timestamp).toLocaleString('en-US', {
          timeZone: 'PST',
          hour12: true,
          timeStyle: 'short',
          dateStyle: 'long',
        })}
      </div>
      <div className={style.etherscanLink}>
        <a
          href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
          target='__blank'
          rel='noreferrer'
          className={style.etherscanLink}
        >
          View on Etherscan
          <FiArrowUpRight />
        </a>
      </div>
    </div>
  );
};

export default TransactionDetails;
