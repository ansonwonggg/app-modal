import { useModal } from 'react-app-modal';
import { Box, Button, Dialog, Typography } from '@mui/material';

const WelcomeModal = (): JSX.Element => {
	const { open, trigger } = useModal<null>('welcome-modal');

	return (
		<Dialog open={open}>
			<Box
				sx={{
					'& *': { padding: '5px' },
					margin: '2rem',
					textAlign: 'center',
				}}
			>
				<Typography color='blue' variant='h3'>
					Welcome!
				</Typography>
				<Typography>
					It is an example integrated with MUI Library. Click
					&quot;Thanks&quot; to continue.
				</Typography>
				<Button onClick={() => trigger()}>Thanks</Button>
			</Box>
		</Dialog>
	);
};

export default WelcomeModal;
