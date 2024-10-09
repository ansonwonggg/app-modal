import type { ModalSnapshot, InitModal } from '.';
import Modal from './modal';
import ModalStore from './store';

class ModalClient {
	#store: ModalStore;
	#snapshots: Record<string, ModalSnapshot<unknown>> = {};
	#initContent: Record<string, unknown | null> = {};

	constructor(init?: InitModal[]) {
		this.#store = new ModalStore();

		init?.forEach(iModal => {
			const { name, content = null, open = false } = iModal;

			this.#initContent[name] = content;

			const modal = this.#createModal(name);
			modal.open = open;

			this.#store.register(modal);
			this.#updateSnapshot(modal);
		});
	}

	#createModal(name: string): Modal {
		const modal = new Modal({ name });

		const initContent = this.#initContent[name];

		if (initContent) {
			modal.content = initContent;
		}

		return modal;
	}

	verify(name: string): void {
		const isRegistered = this.#store.isRegistered(name);

		if (isRegistered) return;

		const newModal = this.#createModal(name);
		this.#updateSnapshot(newModal);
		this.#store.register(newModal);
	}

	getModal<T = unknown>(name: string): Modal<T> {
		return this.#store.get(name) as Modal<T>;
	}

	trigger(name: string): void {
		const modal = this.#store.get(name);
		modal.open = !modal.open;

		this.#updateSnapshot(modal);
		modal.notifyAll();
	}

	triggerAndClear(name: string): void {
		const modal = this.#store.get(name);

		modal.open = !modal.open;
		modal.content = null;

		this.#updateSnapshot(modal);
		modal.notifyAll();
	}

	update<T = unknown>(name: string, content: T | null): void {
		const modal = this.#store.get(name) as Modal<T>;

		modal.content = content;
		this.#updateSnapshot(modal);
		modal.notifyAll();
	}

	updateAndTrigger<T = unknown>(name: string, content: T): void {
		this.update(name, content);

		this.trigger(name);
	}

	unregister(modal: Modal): void {
		this.#store.unregister(modal);
	}

	#updateSnapshot(modal: Modal): void {
		this.#snapshots[modal.name] = {
			content: modal.content,
			open: modal.open,
			status: modal.getStatus(),
		};
	}

	getSnapshot<T = unknown>(name: string): ModalSnapshot<T> {
		const snapshot = this.#snapshots[name];

		if (!snapshot)
			throw new Error(
				`Cannot find Snapshot value with Modal name "${name}"`
			);

		return snapshot as ModalSnapshot<T>;
	}

	resetContent(name: string): void {
		this.#store.get(name).content = this.#initContent[name];
		this.#updateSnapshot(this.getModal(name));
	}
}

export default ModalClient;
