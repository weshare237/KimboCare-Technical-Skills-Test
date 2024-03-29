import React from 'react';
import Image from 'next/image';
import { FaCcAmazonPay } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import { TransactionState } from '../context/TransactionContext';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import TransactionLoader from './TransactionLoader';

Modal.setAppElement('#__next');

// Main
const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

// Transaction Loader
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
};

const Main = () => {
  const { handleChange, sendTransaction, formData } = TransactionState();

  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent) => {
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) return;

    console.log(addressTo, amount);

    sendTransaction();
  };

  return (
    <div className='container-fluid pt-4 px-4'>
      <div className='row g-4'>
        <div className='col-sm-12 col-xl-6 mx-auto'>
          <div className='bg-secondary rounded h-100 p-4'>
            <div className={style.formHeader}>
              <div>Pay</div>{' '}
              <div>
                <FaCcAmazonPay className='w-10 h-10' />{' '}
              </div>{' '}
            </div>
            <form>
              <div className='mb-3'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Amount
                </label>
                <input
                  type='text'
                  className={style.transferPropInput}
                  placeholder='0.0'
                  pattern='^[0-9]*[.,]?[0-9]*$'
                  onChange={(e: React.ChangeEvent) => handleChange(e, 'amount')}
                />
                <div className={style.currencySelector}>
                  {' '}
                  <div className={style.currencySelectorContent}>
                    {' '}
                    <div className={style.currencySelectorIcon}>
                      {' '}
                      <Image
                        src='/assets/eth.png'
                        alt='ethereum logo'
                        height={20}
                        width={20}
                      />
                    </div>
                    <div className={style.currencySelectorTicker}>ETH</div>
                    <AiOutlineDown className={style.currencySelectorArrow} />
                  </div>
                </div>
                {/* <div id='emailHelp' className='form-text'>
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputPassword1' className='form-label'>
                  Address
                </label>
                <input
                  type='text'
                  className={style.transferPropInput}
                  placeholder='0x ...'
                  onChange={(e: React.ChangeEvent) =>
                    handleChange(e, 'addressTo')
                  }
                />
                {/* <div id='emailHelp' className='form-text'>
                  We'll never share your email with anyone else.
                </div> */}
              </div>

              <button
                type='submit'
                className='btn btn-primary'
                onClick={(e: React.MouseEvent) => handleSubmit(e)}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />{' '}
      </Modal>
    </div>
  );
};

export default Main;
