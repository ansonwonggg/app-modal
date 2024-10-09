import { fireEvent, render } from '@testing-library/react';
import { ModalProvider, useModal, useModalDispatch } from '../..';
import { useRef, useState } from 'react';
import { ModalClient } from 'modal-core';

type SubmitModal = {
	input: string;
	onConfirm: VoidFunction;
};

type ComponentProps = {
	onConfirm: VoidFunction;
};

const MyModal = (): JSX.Element => {
	const { open, content, triggerAndClear } =
		useModal<SubmitModal>('confirm-modal');
	const [modalStatus, setModalStatus] = useState<'confirm' | 'submit'>(
		'confirm'
	);

	const onSubmit = (): void => {
		content?.onConfirm();
		setModalStatus('submit');
	};

	if (!open) return <></>;

	return (
		<>
			{modalStatus === 'confirm' && (
				<>
					<p>Confirm to Submit?</p>
					<button onClick={() => onSubmit()}>Yes</button>
					<button onClick={() => triggerAndClear()}>No</button>
				</>
			)}
			{modalStatus === 'submit' && (
				<>
					<p>Submitted with value : {content?.input}</p>
					<button onClick={() => triggerAndClear()}>OK</button>
				</>
			)}
		</>
	);
};

const MyForm = (props: ComponentProps): JSX.Element => {
	const { updateAndTrigger } = useModalDispatch<SubmitModal>('confirm-modal');

	const ref = useRef<HTMLInputElement>(null);

	const onSubmit = (): void => {
		updateAndTrigger({
			input: ref.current?.value || '',
			onConfirm: props.onConfirm,
		});
	};

	return (
		<>
			<label>Input Something:</label>
			<input ref={ref} />
			<button onClick={() => onSubmit()}>Submit</button>
		</>
	);
};

const TestComponent = (props: ComponentProps): JSX.Element => {
	return (
		<ModalProvider>
			<MyModal />
			<MyForm {...props} />
		</ModalProvider>
	);
};

describe('Integrated Test Case 2', () => {
	test('user submit', () => {
		const mockFn = vitest.fn();
		const spy = vitest.spyOn(ModalClient.prototype, 'triggerAndClear');
		const { getByText, getByRole } = render(
			<TestComponent onConfirm={mockFn} />
		);

		expect(getByText('Input Something:')).toBeInTheDocument();
		expect(getByRole('textbox')).toBeInTheDocument();
		expect(getByText('Submit')).toBeInTheDocument();

		fireEvent.blur(getByRole('textbox'), {
			target: { value: 'Peter Chan' },
		});
		fireEvent.click(getByText('Submit'));

		expect(getByText('Confirm to Submit?')).toBeInTheDocument();
		expect(getByText('Yes')).toBeInTheDocument();
		expect(getByText('No')).toBeInTheDocument();

		fireEvent.click(getByText('Yes'));
		expect(mockFn).toHaveBeenCalled();
		expect(
			getByText('Submitted with value : Peter Chan')
		).toBeInTheDocument();
		expect(getByText('OK')).toBeInTheDocument();

		fireEvent.click(getByText('OK'));
		expect(spy).toHaveBeenCalled();
	});

	test('user submit but no', () => {
		const mockFn = vitest.fn();
		const spy = vitest.spyOn(ModalClient.prototype, 'triggerAndClear');
		const { getByText, getByRole } = render(
			<TestComponent onConfirm={mockFn} />
		);

		expect(getByText('Input Something:')).toBeInTheDocument();
		expect(getByRole('textbox')).toBeInTheDocument();
		expect(getByText('Submit')).toBeInTheDocument();

		fireEvent.blur(getByRole('textbox'), {
			target: { value: 'Peter Chan' },
		});
		fireEvent.click(getByText('Submit'));

		expect(getByText('Confirm to Submit?')).toBeInTheDocument();
		expect(getByText('Yes')).toBeInTheDocument();
		expect(getByText('No')).toBeInTheDocument();

		fireEvent.click(getByText('No'));
		expect(spy).toHaveBeenCalled();
	});
});
