import { ModalClient, ModalStore } from '..';

describe('Test on Modal Client', () => {
	test('on construct', () => {
		const client = new ModalClient();

		expect(client).toBeTruthy();
	});

	test('on verify with no modal found', () => {
		const spyFn = vitest.fn();
		const spy = vitest.spyOn(ModalStore.prototype, 'register');
		spy.mockImplementation(spyFn);

		const client = new ModalClient();

		client.verify('my-modal');

		expect(spyFn).toHaveBeenCalled();
	});

	test('on verify with modal found', () => {
		const registerFn = vitest.fn();
		const spyRegister = vitest.spyOn(ModalStore.prototype, 'register');
		const spyIsRegister = vitest.spyOn(
			ModalStore.prototype,
			'isRegistered'
		);
		spyRegister.mockImplementation(registerFn);
		spyIsRegister.mockReturnValue(true);

		const client = new ModalClient();

		client.verify('my-modal');

		expect(registerFn).not.toHaveBeenCalled();
	});

	test('on trigger', () => {
		const client = new ModalClient();

		client.verify('my-modal');

		expect(client.getSnapshot('my-modal')).toEqual({
			content: null,
			open: false,
			status: 'close',
		});

		client.trigger('my-modal');

		expect(client.getSnapshot('my-modal')).toEqual({
			content: null,
			open: true,
			status: 'open',
		});
	});

	test('on trigger and clear', () => {
		const client = new ModalClient();

		client.verify('my-modal');
		client.update('my-modal', 'hello');
		client.trigger('my-modal');

		expect(client.getSnapshot('my-modal')).toEqual({
			content: 'hello',
			open: true,
			status: 'open',
		});

		client.triggerAndClear('my-modal');

		expect(client.getSnapshot('my-modal')).toEqual({
			content: null,
			open: false,
			status: 'close',
		});
	});

	test('on update and trigger', () => {
		const client = new ModalClient();

		client.verify('my-modal');
		expect(client.getSnapshot('my-modal')).toEqual({
			content: null,
			open: false,
			status: 'close',
		});

		client.updateAndTrigger('my-modal', 'hello');
		expect(client.getSnapshot('my-modal')).toEqual({
			content: 'hello',
			open: true,
			status: 'open',
		});
	});

	test('on unregister', () => {
		const spyFn = vitest.fn();
		const spy = vitest.spyOn(ModalStore.prototype, 'unregister');
		spy.mockImplementation(spyFn);

		const client = new ModalClient();

		client.verify('my-modal');

		const modal = client.getModal('my-modal');

		client.unregister(modal);

		expect(spyFn).toHaveBeenCalledWith(modal);
	});

	test('get snapshot with incorrect name', () => {
		const client = new ModalClient();

		expect(() => client.getSnapshot('my-modal')).toThrow(
			'Cannot find Snapshot value with Modal name "my-modal"'
		);
	});

	test('on reset content', () => {
		const client = new ModalClient([
			{
				name: 'modal-a',
				content: 'hello',
			},
		]);

		const modal = client.getModal('modal-a');

		expect(modal).toBeTruthy();
		expect(modal.content).toEqual('hello');
		expect(modal.open).toEqual(false);
		expect(client.getSnapshot('modal-a')).toEqual({
			open: false,
			content: 'hello',
			status: 'close',
		});

		client.update('modal-a', 'hi');
		expect(modal.content).toEqual('hi');
		expect(client.getSnapshot('modal-a')).toEqual({
			open: false,
			content: 'hi',
			status: 'close',
		});

		client.resetContent('modal-a');
		expect(modal.content).toEqual('hello');
		expect(client.getSnapshot('modal-a')).toEqual({
			open: false,
			content: 'hello',
			status: 'close',
		});
	});

	test('when having init value, re-register should take it', () => {
		const client = new ModalClient([
			{
				name: 'modal-a',
				content: 'hello',
			},
		]);

		const modalBefore = client.getModal('modal-a');

		expect(modalBefore).toBeTruthy();
		expect(modalBefore.content).toEqual('hello');
		expect(modalBefore.open).toEqual(false);
		expect(client.getSnapshot('modal-a')).toEqual({
			open: false,
			content: 'hello',
			status: 'close',
		});

		client.unregister(modalBefore);
		client.verify('modal-a');

		const modalAfter = client.getModal('modal-a');
		expect(modalAfter).toBeTruthy();
		expect(modalAfter.content).toEqual('hello');
		expect(modalAfter.open).toEqual(false);
		expect(client.getSnapshot('modal-a')).toEqual({
			open: false,
			content: 'hello',
			status: 'close',
		});
	});
});
