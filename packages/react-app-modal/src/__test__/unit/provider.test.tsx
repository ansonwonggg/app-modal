import { render } from '@testing-library/react';
import { ModalProvider } from '../..';

describe('Test on Provider', () => {
	test('on render', () => {
		const { getByText } = render(
			<ModalProvider>Hello World</ModalProvider>
		);

		expect(getByText('Hello World')).toBeInTheDocument();
	});
});
