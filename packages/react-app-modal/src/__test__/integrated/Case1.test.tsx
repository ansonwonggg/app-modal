import { useState } from 'react';
import { ModalProvider, useModal, useModalDispatch } from '../..';
import { fireEvent, render } from '@testing-library/react';

const Modal = (): JSX.Element => {
	const { open, content, trigger } = useModal<number>('my-modal');

	return (
		<form action='#' onSubmit={e => e.preventDefault()}>
			<dialog open={open}>
				<p>Count is {content}</p>
				<button onClick={() => trigger()}>Close</button>
			</dialog>
		</form>
	);
};

const Counter = (): JSX.Element => {
	const [count, setCount] = useState<number>(0);
	const { updateAndTrigger } = useModalDispatch<number>('my-modal');

	return (
		<>
			<p>Current Count: {count}</p>
			<button onClick={() => setCount(prev => prev + 1)}>Add</button>
			<button onClick={() => setCount(prev => prev - 1)}>Minus</button>
			<button onClick={() => updateAndTrigger(count)}>Show Modal</button>
		</>
	);
};

const TestComponent = (): JSX.Element => {
	return (
		<ModalProvider>
			<Modal />
			<Counter />
		</ModalProvider>
	);
};

describe('Integrated Test Case 1', () => {
	test('show and close', () => {
		const { getByText } = render(<TestComponent />);

		expect(getByText('Current Count: 0')).toBeInTheDocument();
		expect(getByText(/Count is/)).toBeInTheDocument();
		expect(getByText(/Count is/)).not.toBeVisible();

		fireEvent.click(getByText('Show Modal'));

		expect(getByText('Current Count: 0')).toBeInTheDocument();
		expect(getByText('Count is 0')).toBeInTheDocument();
		expect(getByText('Count is 0')).toBeVisible();

		fireEvent.click(getByText('Close'));

		expect(getByText('Current Count: 0')).toBeInTheDocument();
		expect(getByText('Count is 0')).toBeInTheDocument();
		expect(getByText('Count is 0')).not.toBeVisible();
	});

	test('add, show and close', () => {
		const { getByText } = render(<TestComponent />);

		expect(getByText('Current Count: 0')).toBeInTheDocument();
		expect(getByText(/Count is/)).toBeInTheDocument();
		expect(getByText(/Count is/)).not.toBeVisible();

		for (let i = 0; i < 10; i++) {
			fireEvent.click(getByText('Add'));

			expect(getByText(`Current Count: ${i + 1}`)).toBeInTheDocument();
			expect(getByText(/Count is/)).toBeInTheDocument();
			expect(getByText(/Count is/)).not.toBeVisible();

			fireEvent.click(getByText('Show Modal'));

			expect(getByText(`Current Count: ${i + 1}`)).toBeInTheDocument();
			expect(getByText(`Count is ${i + 1}`)).toBeInTheDocument();
			expect(getByText(`Count is ${i + 1}`)).toBeVisible();

			fireEvent.click(getByText('Close'));

			expect(getByText(`Current Count: ${i + 1}`)).toBeInTheDocument();
			expect(getByText(`Count is ${i + 1}`)).toBeInTheDocument();
			expect(getByText(`Count is ${i + 1}`)).not.toBeVisible();
		}
	});
});
