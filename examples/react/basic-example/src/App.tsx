import { ModalProvider } from 'react-app-modal';
import AppModal from './components/AppModal';
import MyPage from './components/MyPage';

const App = () => {
	return (
		<ModalProvider>
			<MyPage />
			<AppModal />
		</ModalProvider>
	);
};

export default App;
