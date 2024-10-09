import Listener from '../listener';

describe('Test on Listener', () => {
	test('on construct not dispatcher', () => {
		const notifier = vitest.fn();
		const listener = new Listener({
			isDispatcher: false,
			notifyFn: notifier,
		});

		expect(listener).toBeTruthy();

		listener.notify();
		expect(notifier).toHaveBeenCalled();
	});

	test('on construct is dispatcher', () => {
		const listener = new Listener({
			isDispatcher: true,
			notifyFn: null,
		});

		expect(listener).toBeTruthy();
	});
});
