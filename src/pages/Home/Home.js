import { useAccount } from 'wagmi';

import Delegate from '../../components/Delegate/Delegate';
import NotConnected from '../NotConnected/NotConnected';

/**
 * @name Home
 * @description Displays the Delegate component if the user is connected, otherwise it displays the NotConnected component.
 * @dev This component is used in the App component.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const Home = () => {
	const { isConnected, address, connector } = useAccount();
	return !isConnected ? <NotConnected /> : <Delegate address={address} connector={connector} />;
};

export default Home;
