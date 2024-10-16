import { useModalDispatch } from 'react-app-modal';
import { useRef } from 'react';

const MyPage = (): JSX.Element => {
	const { updateAndTrigger } = useModalDispatch<string>('my-modal');

	const ref = useRef<HTMLInputElement>(null);

	return (
		<>
			<p>What is your name?</p>
			<input ref={ref} type='text' />
			<button
				onClick={() => updateAndTrigger(ref.current?.value || '')}
				type='button'
			>
				Say Hello
			</button>
		</>
	);
};

export default MyPage;
