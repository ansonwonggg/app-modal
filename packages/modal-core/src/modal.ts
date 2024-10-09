import Listener from './listener';
import type { ModalStatus } from './type';

type ModalConstructorOption<T> = {
	name: string;
	content?: T | null;
	open?: boolean;
};

class Modal<T = unknown> {
	name: string;
	open: boolean;
	content: T | null;
	listeners: Set<Listener> = new Set();

	constructor(option: ModalConstructorOption<T>) {
		const { name, content = null, open = false } = option;

		this.name = name;
		this.open = open;
		this.content = content;
	}

	subscribe(subscription: VoidFunction | Listener): VoidFunction {
		let listener = null;

		if (subscription instanceof Listener) {
			listener = subscription;
		} else {
			listener = new Listener({
				isDispatcher: false,
				notifyFn: subscription,
			});
		}

		this.listeners.add(listener);

		return () => this.unsubscribe(listener);
	}

	unsubscribe(listenerToRemove: Listener): void {
		this.listeners.delete(listenerToRemove);
	}

	notifyAll(): void {
		this.listeners.forEach(listener => listener.notify());
	}

	getStatus(): ModalStatus {
		return this.open ? 'open' : 'close';
	}

	isIdle(): boolean {
		return this.listeners.size === 0;
	}
}

export default Modal;
