import { ModalProvider, type InitModal } from 'react-app-modal';
import WelcomeModal from './components/WelcomeModal';
import MyPage from './components/MyPage';
import AnotherModal from './components/AnotherModal';

const init: InitModal[] = [{ name: 'welcome-modal', open: true }];

const App = () => {
	return (
		<ModalProvider init={init}>
			<AnotherModal />
			<WelcomeModal />
			<MyPage />
		</ModalProvider>
	);
};

export default App;
