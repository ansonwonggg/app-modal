import { useMemo, type PropsWithChildren } from 'react';
import { ModalContext } from './context';
import { ModalClient, type InitModal } from 'modal-core';

type ModalProviderProps = {
	/**
	 * A list of object which would be initialized at Modal Provider created.
	 */
	init?: InitModal[];
};

/**
 * `react-app-modal` would use react context API to offer different hooks to control Modal
 * Component. You can pass an initial value of modal in this provider and so that you could
 * `reset` or `show` your Modal content with default value.
 */
const ModalProvider = (
	props: PropsWithChildren<ModalProviderProps>
): JSX.Element => {
	const { init, children } = props;

	const client: ModalClient = useMemo(() => new ModalClient(init), []);

	const contextValue = useMemo(
		() => ({
			client,
		}),
		[client]
	);

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
