import { ModalProvider } from 'react-app-modal';
import MyPage from './components/MyPage';
import SubmissionModal from './components/SubmissionModal';
import './App.css';

const App = () => {
	return (
		<ModalProvider>
			<MyPage />
			<SubmissionModal />
		</ModalProvider>
	);
};

export default App;
