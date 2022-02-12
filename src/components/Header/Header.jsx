import './Header.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetWallet,
  setAddressStart,
} from '../../redux/wallet/wallet.actions';
import { getTotalGasUsed } from '../../redux/wallet/wallet.selectors';

const Header = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [lookupAddress, setLookupAddress] = useState('');
  const dispatch = useDispatch();

  const totalGasUsed = useSelector(getTotalGasUsed);

  const handleFormChange = (event) => {
    const { value } = event.target;
    setLookupAddress(value);
  };

  const submitAddress = (event) => {
    event.preventDefault();
    dispatch(setAddressStart(lookupAddress));
    setWalletConnected(false);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('MetaMask is not installed');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      dispatch(setAddressStart(accounts[0]));
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    dispatch(resetWallet());
    setWalletConnected(false);
  };

  return (
    <header>
      <div>
        {walletConnected === false ? (
          <button className="header__wallet-button" onClick={connectWallet}>
            Connect to Wallet
          </button>
        ) : (
          <button className="header__wallet-button" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        )}
        <br />
        OR
        <form onSubmit={submitAddress}>
          <label>Lookup Ethererum Address: </label>
          <input
            type="text"
            maxLength="42"
            onChange={handleFormChange}
            aria-label="address-input"
          />
          <button className="header__go-button" onClick={submitAddress}>
            Lookup
          </button>
        </form>
      </div>
      {totalGasUsed !== null && (
        <h6>
          Total gas spent on transactions: {parseFloat(totalGasUsed).toFixed(8)}{' '}
          Eth
        </h6>
      )}
    </header>
  );
};
export default Header;
