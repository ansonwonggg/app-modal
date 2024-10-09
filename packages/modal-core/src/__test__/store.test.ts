import { Modal, ModalStore } from '..';

describe('Test on ModalStore Class', () => {
	test('on register with no duplicate name', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		store.register(modal);

		expect(store.isRegistered('my-modal')).toEqual(true);
	});

	test('on register with duplicate name', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		store.register(modal);

		expect(() => store.register(modal)).toThrow(
			'You cannot register this Modal with same name of "my-modal"'
		);
	});

	test('get modal with correct name', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		store.register(modal);

		expect(store.get('my-modal')).toEqual(modal);
	});

	test('get modal with incorrect name', () => {
		const store = new ModalStore();

		expect(() => store.get('my-modal')).toThrow(
			'Cannot find Modal with name "my-modal".'
		);
	});

	test('unregister with item found', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		store.register(modal);

		expect(store.isRegistered('my-modal')).toEqual(true);

		store.unregister(modal);
		expect(store.isRegistered('my-modal')).toEqual(false);
	});

	test('unregister with item not found', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		expect(() => store.unregister(modal)).not.toThrow();
	});

	test('on notify modal', () => {
		const store = new ModalStore();
		const modal = new Modal({ name: 'my-modal' });

		store.register(modal);

		const notifier = vitest.fn();
		modal.subscribe(notifier);

		store.notifyModal('my-modal');
		expect(notifier).toHaveBeenCalled();
	});
});
