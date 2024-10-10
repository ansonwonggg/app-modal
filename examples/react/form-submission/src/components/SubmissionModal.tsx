import { useModal } from 'react-app-modal';
import type { SubmitModalContent } from './type';
import { useEffect, useState } from 'react';

type SubmitStatus = 'start' | 'success' | 'fail';

const timeout: number = 3000;

const SubmissionModal = (): JSX.Element => {
	const { open, content, triggerAndClear } =
		useModal<SubmitModalContent>('submit-modal');

	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('start');

	const onCloseModal = () => {
		content?.onComplete();
		triggerAndClear();
		setSubmitStatus('start');
	};

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => {
				const isAdmin =
					content?.data.username === 'admin' &&
					content?.data.password === 'admin';
				setSubmitStatus(isAdmin ? 'success' : 'fail');
			}, timeout);

			return () => clearTimeout(timer);
		}
	}, [open]);

	// eslint-disable-next-line react/jsx-no-useless-fragment
	if (!open) return <></>;

	return (
		<div className='submit-modal'>
			{submitStatus === 'start' && (
				<div className='spinner-background'>
					<span className='spinner' />
				</div>
			)}
			{submitStatus === 'success' && (
				<div className='modal-message'>
					<p>&#x1F44D;</p>
					<p>You have successfully login.</p>
					<button onClick={() => onCloseModal()} type='button'>
						OK
					</button>
				</div>
			)}
			{submitStatus === 'fail' && (
				<div className='modal-message'>
					<p>⚠️</p>
					<p>Invalid Account. Please try again.</p>
					<button onClick={() => onCloseModal()} type='button'>
						OK
					</button>
				</div>
			)}
		</div>
	);
};

export default SubmissionModal;
