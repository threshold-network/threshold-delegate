
// Components
import { ethers } from 'ethers';
import Delegate from '../../components/Delegate/Delegate';
import NotConnected from '../NotConnected/NotConnected';
import { useConnectWallet } from '@web3-onboard/react';
import { useEffect, useState } from 'react';

/**
 * @name Home
 * @description Displays the Delegate component if the user is connected, otherwise it displays the NotConnected component.
 * @dev This component is used in the App component.
 */
const Home = () => {
	const [{ wallet } ] = useConnectWallet();
	const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  async function getSigner(provider) {
    try {
      const signer = provider.getUncheckedSigner();
      setSigner(signer);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (wallet?.provider) {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      setProvider(provider);

      const { name, avatar } = wallet?.accounts[0].ens ?? {}

      const account = {
        chainId: 1,
        address: wallet.accounts[0].address,
        ens: { name, avatar: avatar?.url }
      }

      setAccount(account)
    } else {
      setProvider(null)
      setAccount(undefined)
    }
  }, [wallet])

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (provider) {
      getSigner(provider)
    }
  }, [provider]);

	return !provider || !account || !wallet || !signer
		? <NotConnected setAccount={setAccount} /> 
		: <Delegate 
        provider={provider} 
        address={account.address} 
        signer={signer} 
        setAccount={setAccount} 
     />;
};

export default Home;
