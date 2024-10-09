import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { useModalClient } from './context';
import type { Updater, UseModalDispatchReturn, ValueFunction } from './type';
import { Listener, type ModalSnapshot } from 'modal-core';

const isFunction = <T>(content: Updater<T>): content is ValueFunction<T> =>
	typeof content === 'function';

/**
 *
 * Hook as a **assistant** in your Content Component to handle Modal Component. It would return some functions
 * which can handle content and status of the Modal Component which subscribe with `useModal`.
 *
 * @param {string} name Name of the Modal defined. It would be the key to find the correct modal content
 * for providing action to trigger.
 *
 * ---
 *
 * @example
 *
 * ```tsx
 * const MyComponent = () : JSX.Element => {
 * 		const { updateAndTrigger } = useModalDispatch<string>('my-modal');
 *
 * 		const ref = useRef<HTMLInputElement>(null);
 *
 * 		const showModal = () : void => {
 * 			updateAndTrigger(ref.current?.value)
 * 		}
 *
 * 		return (
 * 			<>
 * 				<input ref={ref} type='text' />
 * 				<button onClick={() => showModal()}>Show Modal</button>
 * 			</>
 * 		)
 * }
 * ```
 *
 */
const useModalDispatch = <T>(name: string): UseModalDispatchReturn<T> => {
	const client = useModalClient();
	const [listener] = useState(
		new Listener({ isDispatcher: true, notifyFn: null })
	);

	client.verify(name);

	const modal = useMemo(() => client.getModal<T>(name), [name]);

	const update = useCallback(
		(content: Updater<T>): void => {
			if (isFunction(content)) {
				client.update(
					name,
					content(modal.content as unknown as T | null)
				);
			} else {
				client.update(name, content);
			}
		},
		[client, name]
	);

	const updateAndTrigger = useCallback(
		(content: Updater<T>): void => {
			if (isFunction(content)) {
				client.updateAndTrigger(
					name,
					content(modal.content as unknown as T | null)
				);
			} else {
				client.updateAndTrigger(name, content);
			}
		},
		[client, name]
	);

	const resetContent = useCallback(() => {
		client.resetContent(name);
	}, [client, name]);

	const resetAndClose = useCallback(() => {
		resetContent();
		if (client.getModal(name).open) {
			client.trigger(name);
		}
	}, [client, name]);

	const getSnapshot: () => ModalSnapshot<T> = useCallback(() => {
		return { ...client.getSnapshot(name) };
	}, [client, name]);

	const clearContent = useCallback(
		() => client.update<T>(name, null),
		[client, name]
	);

	const trigger = useCallback(() => client.trigger(name), [client, name]);

	const triggerAndClear = useCallback(
		() => client.triggerAndClear(name),
		[client, name]
	);

	useSyncExternalStore(
		useCallback(() => {
			const unsubscribe = modal.subscribe(listener);
			return () => {
				unsubscribe();
			};
		}, [modal]),
		() => null,
		() => null
	);

	return {
		clearContent,
		getSnapshot,
		resetAndClose,
		resetContent,
		trigger,
		triggerAndClear,
		update,
		updateAndTrigger,
	};
};

export { useModalDispatch };
