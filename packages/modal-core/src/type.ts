export type ModalStatus = 'open' | 'close';

export interface ModalSnapshot<T> {
	/**
	 * Content of the Modal. If there is no default provided in `init` in Provider, this will be null by default.
	 */
	content: T | null;
	/**
	 * Indicates if the modal should be open or close.
	 */
	open: boolean;
	/**
	 * Status based on `open`.
	 */
	status: ModalStatus;
}

export interface InitModal {
	/**
	 * Name of the modal expect to generate. It will be the key to match and find the correct snapshot and trigger the correct modal.
	 */
	name: string;
	/**
	 * Default content of the modal. It could be null. It use for `resetContent`.
	 */
	content?: unknown | null;
	/**
	 * Default open or close of the modal.
	 */
	open?: boolean;
}
