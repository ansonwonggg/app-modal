import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { useModalClient } from './context';
import type { UseModalReturn } from './type';

/**
 * Hook using in your Modal Component. When state of the Modal changed, it will trigger a re-render.
 *
 * @param {string} name Name of the Modal defined. It would be the key to find the correct modal content
 * for providing latest snapshot and action to trigger.
 *
 * `useModal` designed to let you can separate your Modal Component from your Content Component.
 * And so it assumes that your Modal Component should always stay alive when application is alive.
 * Modal content would also stay alive when your application is alive. So content and status of the modal
 * will be maintained if you accidentally destroy your Modal Component.
 *
 * Although we expect Modal Component always separate from your Content Component, there are always some exceptions
 * that you may want to modularize your component in certain way. You should be aware that Modal content won't destroy
 * under the hood. So You should control your content correctly when closing or triggering the modal with the provided
 * functions - `trigger`, `triggerAndClear` and `triggerAndReset`.
 *
 * ---
 *
 * @example
 *
 * ```tsx
 * const Modal = () => {
 * 		const { open, content, trigger } = useModal<string>('my-modal');
 *
 * 		return (
 * 			<MyDialog open={open}>
 * 				<p>Hello, {content}</p>
 * 				<button onClick={() => trigger()}>OK</button>
 * 			</MyDialog>
 * 		)
 * }
 * ```
 *
 * @remarks
 * `open`, `content` and `status` is cloned in every render. Do remind when you need to use those value
 * in dependency array in react-hooks.
 *
 */
const useModal = <T>(name: string): UseModalReturn<T> => {
	const client = useModalClient();

	client.verify(name);

	const modal = useMemo(() => client.getModal<T>(name), [name]);

	const trigger = useCallback(() => client.trigger(name), [client, name]);

	const triggerAndClear = useCallback(
		() => client.triggerAndClear(name),
		[client, name]
	);

	const triggerAndReset = useCallback(() => {
		client.resetContent(name);
		if (modal.open) {
			client.trigger(name);
		}
	}, [client, name]);

	const snapshot = useSyncExternalStore(
		useCallback(
			listener => {
				const unsubscribe = modal.subscribe(listener);
				return unsubscribe;
			},
			[modal]
		),
		() => client.getSnapshot<T>(name),
		() => client.getSnapshot<T>(name)
	);

	const clonedSnapshot = { ...snapshot };

	return {
		...clonedSnapshot,
		trigger,
		triggerAndClear,
		triggerAndReset,
	};
};

export { useModal };
