import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TransactionState } from '../context/TransactionContext';

const Statistique = () => {
  const [currentBalance, setCurrentBalance] = useState<string>('');
  const { currentAccount, txCount, isLoading } = TransactionState();

  async function getBalance() {
    // Make sure MetaMask is installed
    if (typeof window !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.enable();

        // Create a provider connected to MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (connected account)
        const signer = provider.getSigner();

        // Get the balance of the connected account
        const balance = await signer.getBalance();

        // Convert the balance to  ether (from wei)
        const etherBalance = ethers.utils.formatEther(balance);

        setCurrentBalance(etherBalance);

        // You can now use the  etherBalance variable to display the balance in your UI
      } catch (error) {
        console.error('MetaMask connection error: ', error);
      }
    } else {
      console.log('Please install MetaMask to use this feature.');
    }
  }

  useEffect(() => {
    if (!currentAccount) return;
    getBalance();
  }, [isLoading, currentAccount]);

  return (
    <div className='container-fluid pt-4 px-4'>
      <div className='row g-4 flex justify-content-around'>
        <div className='col-sm-6 col-xl-3'>
          <div className='bg-secondary rounded d-flex align-items-center justify-content-between p-4'>
            <i className='fa fa-chart-line fa-3x text-primary'></i>
            <div className='ms-3'>
              <p className='mb-2'>Total Transactions</p>
              <h6 className='mb-0'>{txCount < 10 ? `0${txCount}` : txCount}</h6>
            </div>
          </div>
        </div>
        <div className='col-sm-6 col-xl-3'>
          <div className='bg-secondary rounded d-flex align-items-center justify-content-between p-4'>
            <i className='fas fa-wallet fa-3x text-primary'></i>
            <div className='ms-3'>
              <p className='mb-2'>Wallet Balance</p>
              <h6 className='mb-0'>{currentBalance} ETH</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistique;
