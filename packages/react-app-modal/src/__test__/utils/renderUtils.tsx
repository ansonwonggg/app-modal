import { renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { ModalProvider } from '../..';

export function renderHookWithModalProvider<TResult>(
	hooks: () => TResult,
	init?: Parameters<typeof ModalProvider>[0]['init']
) {
	const wrapper = ({ children }: PropsWithChildren) => {
		return <ModalProvider init={init}>{children}</ModalProvider>;
	};

	return renderHook(hooks, { wrapper });
}
