import { fireEvent, render } from '@testing-library/react';
import { ModalClient, type InitModal } from 'modal-core';
import { ModalProvider, useModal } from '../..';

const CookieModal = (): JSX.Element => {
	const { open, trigger } = useModal<null>('cookie-modal');

	const onAccept = (): void => {
		trigger();
		console.log('You accepted Cookies');
	};

	if (!open) return <></>;

	return (
		<>
			<p>Please accept cookie settings.</p>
			<button onClick={() => onAccept()}>Accept</button>
		</>
	);
};

const MyPage = (): JSX.Element => {
	return (
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
			unde ex nihil alias debitis, expedita nisi incidunt voluptatibus
			labore ipsum neque architecto deleniti natus, repudiandae in quis
			ipsam, corporis sint.
		</p>
	);
};

const init: InitModal[] = [
	{
		name: 'cookie-modal',
		open: true,
	},
];

const TestComponent = (): JSX.Element => {
	return (
		<ModalProvider init={init}>
			<CookieModal />
			<MyPage />
		</ModalProvider>
	);
};

describe('Integrated Test Case 3', () => {
	test('on render', () => {
		const spyTrigger = vitest.spyOn(ModalClient.prototype, 'trigger');
		const spyConsole = vitest.spyOn(console, 'log');

		const { getByText, queryByText } = render(<TestComponent />);

		expect(getByText(/Lorem/)).toBeInTheDocument();
		expect(getByText('Please accept cookie settings.')).toBeInTheDocument();
		expect(getByText('Accept')).toBeInTheDocument();

		fireEvent.click(getByText('Accept'));

		expect(spyTrigger).toHaveBeenCalled();
		expect(spyConsole).toHaveBeenCalledWith('You accepted Cookies');
		expect(getByText(/Lorem/)).toBeInTheDocument();
		expect(queryByText('Please accept cookie settings.')).toBeNull();
	});
});
