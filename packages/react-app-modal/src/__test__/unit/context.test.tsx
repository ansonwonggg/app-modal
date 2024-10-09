import { renderHook } from '@testing-library/react';
import { useModalClient, ModalProvider } from '../..';

describe('Test on useModalClient', () => {
	test('on useModalClient correctly', () => {
		const { result } = renderHook(useModalClient, {
			wrapper: ({ children }) => (
				<ModalProvider>{children}</ModalProvider>
			),
		});

		expect(result.current).toBeTruthy();
	});

	test('on useModalClient without provider', () => {
		expect(() => renderHook(useModalClient)).toThrow(
			'You can only use `useModalStore` inside `ModalProvider`.'
		);
	});
});
