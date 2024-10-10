import { useModal } from 'react-app-modal';

const AppModal = (): JSX.Element => {
	const { open, content, trigger } = useModal<string>('my-modal');

	return (
		<form onSubmit={e => e.preventDefault()}>
			<dialog open={open}>
				<p>Hello, {content}</p>
				<button onClick={() => trigger()} type='button'>
					Close
				</button>
			</dialog>
		</form>
	);
};

export default AppModal;
