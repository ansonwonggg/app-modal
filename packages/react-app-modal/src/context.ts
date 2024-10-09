import { createContext, useContext } from 'react';
import { type ModalClient } from 'modal-core';

type ModalContextValue = {
	client: ModalClient;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalClient = (): ModalClient => {
	const ctx = useContext(ModalContext);

	if (!ctx)
		throw new Error(
			'You can only use `useModalStore` inside `ModalProvider`.'
		);

	return ctx.client;
};

export { ModalContext, useModalClient };
