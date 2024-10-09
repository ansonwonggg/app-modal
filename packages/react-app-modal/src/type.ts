import type { ModalSnapshot } from 'modal-core';

type ValueFunction<T> = (prev: T | null) => T | null;
type Updater<T> = T | ValueFunction<T>;

type UseModalDispatchReturn<T> = {
	/**
	 * On call this function, it will set Modal content to null.
	 */
	clearContent: VoidFunction;
	/**
	 * Get the latest snapshot of the Modal. To prevent unexpected mutation of the snapshot, it will
	 * return a new copy of the snapshot every time this function called.
	 */
	getSnapshot: () => ModalSnapshot<T>;
	/**
	 * Reset Modal content to initial value and close the modal.
	 */
	resetAndClose: VoidFunction;
	/**
	 * Reset Modal content to initial value only.
	 */
	resetContent: VoidFunction;
	/**
	 * Trigger Modal to open or close depends on previous state.
	 */
	trigger: VoidFunction;
	/**
	 * Trigger Modal to open or close depends on previous state and clear the content.
	 */
	triggerAndClear: VoidFunction;
	/**
	 * Update Modal content with value or function provided in the argument.
	 */
	update: (content: Updater<T>) => void;
	/**
	 * Update Modal content with value or function provided in the argument. It will trigger the modal
	 * status as well.
	 */
	updateAndTrigger: (content: Updater<T>) => void;
};

type UseModalReturn<T> = ModalSnapshot<T> & {
	/**
	 * Trigger Modal to open or close depends on previous state.
	 */
	trigger: VoidFunction;
	/**
	 * Trigger Modal to open or close depends on previous state and clear the content.
	 */
	triggerAndClear: VoidFunction;
	/**
	 * Trigger Modal to open or close depends on previous state and reset the content to initial.
	 */
	triggerAndReset: VoidFunction;
};

export type { ValueFunction, Updater, UseModalDispatchReturn, UseModalReturn };
