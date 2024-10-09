import type Modal from './modal';

class ModalStore {
	#modals: Set<Modal> = new Set();

	get(name: string): Modal {
		const finding = Array.from(this.#modals).find(
			modal => modal.name === name
		);

		if (!finding) throw new Error(`Cannot find Modal with name "${name}".`);

		return finding;
	}

	register(newModal: Modal): void {
		const finding = Array.from(this.#modals).find(
			modal => modal.name === newModal.name
		);

		if (finding)
			throw new Error(
				`You cannot register this Modal with same name of "${newModal.name}"`
			);

		this.#modals.add(newModal);
	}

	unregister(modal: Modal): void {
		this.#modals.delete(modal);
	}

	isRegistered(name: string): boolean {
		return !!Array.from(this.#modals).find(modal => modal.name === name);
	}

	notifyModal(name: string): void {
		this.get(name).notifyAll();
	}
}

export default ModalStore;
