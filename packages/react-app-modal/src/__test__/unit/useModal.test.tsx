import { act, fireEvent, render } from '@testing-library/react';
import { ModalProvider, useModal, useModalDispatch } from '../..';
import { ModalClient } from 'modal-core';

import { renderHookWithModalProvider } from '../utils/renderUtils';
import { useState } from 'react';

describe('Test on useModal', () => {
	test('on render useModal, should verify on every render', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'verify');
		const { result, rerender } = renderHookWithModalProvider(() =>
			useModal('modal-a')
		);

		expect(result.current).toEqual({
			open: false,
			content: null,
			status: 'close',
			trigger: expect.any(Function),
			triggerAndClear: expect.any(Function),
			triggerAndReset: expect.any(Function),
		});
		expect(spy).toHaveBeenCalledWith('modal-a');

		spy.mockReset();
		rerender();

		expect(spy).toHaveBeenCalledWith('modal-a');
	});

	test('on trigger', () => {
		const { result, rerender } = renderHookWithModalProvider(() =>
			useModal('modal-a')
		);

		expect(result.current.open).toEqual(false);
		act(() => result.current.trigger());

		rerender();
		expect(result.current.open).toEqual(true);
	});

	test('on trigger and clear', () => {
		const { result, rerender } = renderHookWithModalProvider(
			() => useModal('modal-a'),
			[{ name: 'modal-a', content: 'hello', open: true }]
		);

		expect(result.current.open).toEqual(true);
		expect(result.current.content).toEqual('hello');
		act(() => result.current.triggerAndClear());

		rerender();
		expect(result.current.open).toEqual(false);
		expect(result.current.content).toBeNull();
	});

	test('on trigger and reset, when modal already close', () => {
		const { result, rerender } = renderHookWithModalProvider(
			() => useModal('modal-a'),
			[{ name: 'modal-a', content: 'hello', open: true }]
		);

		expect(result.current.open).toEqual(true);
		expect(result.current.content).toEqual('hello');
		act(() => result.current.triggerAndClear());

		rerender();
		expect(result.current.open).toEqual(false);
		expect(result.current.content).toBeNull();

		act(() => result.current.triggerAndReset());

		rerender();
		expect(result.current.open).toEqual(false);
		expect(result.current.content).toEqual('hello');
	});

	test('on trigger and reset, when modal is open', () => {
		const { result, rerender } = renderHookWithModalProvider(
			() => useModal('modal-a'),
			[{ name: 'modal-a', content: 'hello' }]
		);

		expect(result.current.open).toEqual(false);
		expect(result.current.content).toEqual('hello');
		act(() => result.current.triggerAndClear());

		rerender();
		expect(result.current.open).toEqual(true);
		expect(result.current.content).toBeNull();

		act(() => result.current.triggerAndReset());

		rerender();
		expect(result.current.open).toEqual(false);
		expect(result.current.content).toEqual('hello');
	});

	test('should not unregister on unmount when helper or other subscription', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'unregister');
		const Helper = (): JSX.Element => {
			useModalDispatch('modal-a');
			return <></>;
		};

		const Modal = (): JSX.Element => {
			useModal('modal-a');
			return <>I am Modal</>;
		};

		const TestComponent = (): JSX.Element => {
			const [show, setShow] = useState(true);

			return (
				<ModalProvider>
					<Helper />
					{show && <Modal />}
					<button onClick={() => setShow(prev => !prev)}>
						Trigger
					</button>
				</ModalProvider>
			);
		};

		const { getByText, queryByText } = render(<TestComponent />);

		expect(getByText('I am Modal')).toBeInTheDocument();
		fireEvent.click(getByText('Trigger'));

		expect(spy).not.toHaveBeenCalled();
		expect(queryByText('I am Modal')).toBeNull();
	});
});
