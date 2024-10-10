import { useModalDispatch } from 'react-app-modal';
import { Button, Box } from '@mui/material';

const MyPage = (): JSX.Element => {
	const { trigger } = useModalDispatch<null>('another-modal');

	return (
		<Box
			sx={{
				left: '50%',
				position: 'absolute',
				top: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Button
				color='secondary'
				onClick={() => trigger()}
				variant='contained'
			>
				Click to Open a Dialog
			</Button>
		</Box>
	);
};

export default MyPage;
