import { renderHookWithModalProvider } from '../utils/renderUtils';
import { useModalDispatch } from '../..';
import { Modal, ModalClient } from 'modal-core';

describe('Test on useModalDispatch', () => {
	test('only verify', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'verify');
		const spySubscribe = vitest.spyOn(Modal.prototype, 'subscribe');

		const { rerender, result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		expect(spySubscribe).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith('modal-a');
		expect(result.current).toEqual({
			clearContent: expect.any(Function),
			getSnapshot: expect.any(Function),
			resetAndClose: expect.any(Function),
			resetContent: expect.any(Function),
			trigger: expect.any(Function),
			triggerAndClear: expect.any(Function),
			update: expect.any(Function),
			updateAndTrigger: expect.any(Function),
		});

		spy.mockReset();

		rerender();
		expect(spySubscribe).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith('modal-a');
	});

	test('on unmount, should unsubscribe helper', () => {
		const spyUnsubscribe = vitest.spyOn(Modal.prototype, 'unsubscribe');

		const { unmount } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		unmount();

		expect(spyUnsubscribe).toHaveBeenCalled();
	});

	test('on update value explicitly', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'update');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		expect(result.current.getSnapshot().content).toBeNull();

		result.current.update('hello');
		expect(spy).toHaveBeenCalledWith('modal-a', 'hello');
		expect(result.current.getSnapshot().content).toEqual('hello');
	});

	test('on update value with function', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'update');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		expect(result.current.getSnapshot().content).toBeNull();

		result.current.update(() => {
			return 'hello';
		});
		expect(spy).toHaveBeenCalledWith('modal-a', 'hello');
		expect(result.current.getSnapshot().content).toEqual('hello');
	});

	test('on updateAndTrigger value explicitly', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'updateAndTrigger');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		expect(result.current.getSnapshot().content).toBeNull();

		result.current.updateAndTrigger('hello');
		expect(spy).toHaveBeenCalledWith('modal-a', 'hello');
		expect(result.current.getSnapshot().content).toEqual('hello');
	});

	test('on updateAndTrigger value with function', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'updateAndTrigger');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		expect(result.current.getSnapshot().content).toBeNull();

		result.current.updateAndTrigger(() => {
			return 'hello';
		});
		expect(spy).toHaveBeenCalledWith('modal-a', 'hello');
		expect(result.current.getSnapshot().content).toEqual('hello');
	});

	test('on reset content', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'resetContent');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.resetContent();

		expect(spy).toHaveBeenCalledWith('modal-a');
	});

	test('on reset content and trigger', () => {
		const spyRest = vitest.spyOn(ModalClient.prototype, 'resetContent');
		const spyTrigger = vitest.spyOn(ModalClient.prototype, 'trigger');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.resetAndClose();

		expect(spyRest).toHaveBeenCalledWith('modal-a');
		expect(spyTrigger).not.toHaveBeenCalled();

		result.current.trigger();

		result.current.resetAndClose();

		expect(spyRest).toHaveBeenCalledWith('modal-a');
		expect(spyTrigger).toHaveBeenCalledWith('modal-a');
	});

	test('on clear content', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'update');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.clearContent();

		expect(spy).toHaveBeenCalledWith('modal-a', null);
	});

	test('on trigger', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'trigger');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.trigger();

		expect(spy).toHaveBeenCalledWith('modal-a');
	});

	test('on trigger and clear', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'triggerAndClear');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.triggerAndClear();

		expect(spy).toHaveBeenCalledWith('modal-a');
	});

	test('on get snapshot', () => {
		const spy = vitest.spyOn(ModalClient.prototype, 'getSnapshot');
		const { result } = renderHookWithModalProvider(() =>
			useModalDispatch('modal-a')
		);

		result.current.getSnapshot();

		expect(spy).toHaveBeenCalledWith('modal-a');
	});
});
