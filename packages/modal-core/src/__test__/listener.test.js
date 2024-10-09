import Listener from '../listener';

describe('Test on Listener JS', () => {
	test('on incorrect parameter', () => {
		expect(
			() => new Listener({ isDispatcher: false, notifyFn: null })
		).toThrow('Non-dispatcher should have a notify function');
	});
});
