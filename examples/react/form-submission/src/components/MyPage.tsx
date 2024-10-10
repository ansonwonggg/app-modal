import { useModalDispatch } from 'react-app-modal';
import { useRef, useState, type FormEvent } from 'react';
import type { SubmitModalContent } from './type';

const MyPage = (): JSX.Element => {
	const { updateAndTrigger } =
		useModalDispatch<SubmitModalContent>('submit-modal');

	const [formDisable, setFormDisable] = useState<boolean>(false);

	const loginNameRef = useRef<HTMLInputElement>(null);
	const loginPasswordRef = useRef<HTMLInputElement>(null);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormDisable(true);
		updateAndTrigger({
			data: {
				password: loginPasswordRef.current?.value,
				username: loginNameRef.current?.value,
			},
			onComplete: () => setFormDisable(false),
		});
	};

	return (
		<div className='form-container'>
			<p className='form-header'>Login</p>
			<form className='login-form' onSubmit={onSubmit}>
				<div className='input-field'>
					<label htmlFor='username'>Login Name:</label>
					<input
						disabled={formDisable}
						name='username'
						ref={loginNameRef}
						type='text'
					/>
				</div>
				<div className='input-field'>
					<label htmlFor='password'>Password:</label>
					<input
						disabled={formDisable}
						name='password'
						ref={loginPasswordRef}
						type='password'
					/>
				</div>
				<button
					className='submit-button'
					disabled={formDisable}
					type='submit'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default MyPage;
