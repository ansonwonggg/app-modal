import Listener from '../listener';
import { Modal } from '..';

describe('Test on Modal Class', () => {
	test('On constructor', () => {
		const modal = new Modal({ name: 'my-modal' });

		expect(modal.name).toEqual('my-modal');
		expect(modal.open).toEqual(false);
		expect(modal.content).toBeNull();
		expect(modal.listeners.size).toEqual(0);
		expect(modal.getStatus()).toEqual('close');
	});

	test('On open change, status changes', () => {
		const modal = new Modal({ name: 'my-modal' });

		expect(modal.open).toEqual(false);
		expect(modal.getStatus()).toEqual('close');

		modal.open = true;
		expect(modal.getStatus()).toEqual('open');
	});

	test('On subscribe and unsubscribe, with function', () => {
		const modal = new Modal({ name: 'my-modal' });

		expect(modal.listeners.size).toEqual(0);

		const unsubscribe = modal.subscribe(() => {});

		expect(modal.listeners.size).toEqual(1);
		expect(modal.isIdle()).toEqual(false);

		unsubscribe();

		expect(modal.listeners.size).toEqual(0);
		expect(modal.isIdle()).toEqual(true);
	});

	test('On subscribe and unsubscribe, with listener', () => {
		const modal = new Modal({ name: 'my-modal' });

		expect(modal.listeners.size).toEqual(0);

		const unsubscribe = modal.subscribe(
			new Listener({ isDispatcher: true, notifyFn: null })
		);

		expect(modal.listeners.size).toEqual(1);
		expect(modal.isIdle()).toEqual(false);

		unsubscribe();

		expect(modal.listeners.size).toEqual(0);
		expect(modal.isIdle()).toEqual(true);
	});

	test('On Notify', () => {
		const modal = new Modal({ name: 'my-modal' });

		const notifier1 = vitest.fn();
		const notifier2 = vitest.fn();

		expect(modal.listeners.size).toEqual(0);

		modal.subscribe(notifier1);
		modal.subscribe(notifier2);

		expect(modal.listeners.size).toEqual(2);

		modal.notifyAll();

		expect(notifier1).toHaveBeenCalled();
		expect(notifier2).toHaveBeenCalled();
	});
});
