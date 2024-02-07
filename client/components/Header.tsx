import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TransactionState } from '../context/TransactionContext';
import truncateEthAddress from 'truncate-eth-address';

const Header = () => {
  const [userName, setUserName] = useState<string>('');
  const { connectWallet, currentAccount } = TransactionState();

  useEffect(() => {
    if (!currentAccount) return;
    setUserName(truncateEthAddress(currentAccount));
  }, [currentAccount]);

  return (
    <>
      {/* <!-- Navbar Start --> */}
      <nav className='navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0'>
        <a href='index.html' className='navbar-brand d-flex d-lg-none me-4'>
          <h2 className='text-primary mb-0'>
            <i className='fa fa-user-edit'></i>
          </h2>
        </a>
        <a href='#toggle' className='sidebar-toggler flex-shrink-0'>
          <i className='fa fa-bars'></i>
        </a>
        <form className='d-none d-md-flex ms-4'>
          <input
            className='form-control bg-dark border-0'
            type='search'
            placeholder='Search'
          />
        </form>
        <div className='navbar-nav align-items-center ms-auto'>
          <div className='nav-item dropdown'>
            <a
              href='#ethereum'
              className='nav-link dropdown-toggle flex items-center'
            >
              <Image
                src='/assets/eth.png'
                alt='ethereum logo'
                height={20}
                width={20}
              />
              <span className='d-none d-lg-inline-flex'>Ethereum</span>
            </a>
          </div>
          {currentAccount ? (
            <div className='nav-item dropdown cursor-pointer'>
              <a className='nav-link' href='#user'>
                <i className='fa fa-user me-lg-2'></i>
                <span className='d-none d-lg-inline-flex'>{userName}</span>
              </a>
            </div>
          ) : (
            <div className='nav-item dropdown cursor-pointer'>
              <button
                className='nav-link'
                onClick={() => {
                  connectWallet();
                }}
              >
                <i className='fa fa-wallet me-lg-2'></i>
                <span className='d-none d-lg-inline-flex'>Connect Wallet</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default Header;
