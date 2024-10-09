import { __DEV__ } from './constant';

type ModalListener = {
	isDispatcher: false;
	notifyFn: VoidFunction;
};

type DispatcherListener = {
	isDispatcher: true;
	notifyFn: null;
};

type ListenerConstructor = ModalListener | DispatcherListener;

class Listener {
	#notify: VoidFunction | null;
	#isDispatcher: boolean;

	constructor(args: ListenerConstructor) {
		const { isDispatcher, notifyFn } = args;

		this.#isDispatcher = isDispatcher;

		if (!isDispatcher && !notifyFn && __DEV__) {
			throw new Error('Non-dispatcher should have a notify function');
		}
		this.#notify = notifyFn;
	}

	notify(): void {
		if (!this.#isDispatcher) {
			this.#notify?.();
		}
	}
}

export default Listener;
