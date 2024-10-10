import { useModal } from 'react-app-modal';
import { Box, Button, Dialog, Typography } from '@mui/material';

const AnotherModal = (): JSX.Element => {
	const { open, trigger } = useModal<null>('another-modal');

	return (
		<Dialog open={open}>
			<Box
				sx={{
					'& *': { padding: '5px' },
					margin: '2rem',
					textAlign: 'center',
				}}
			>
				<Typography color='success' variant='h3'>
					Congratulation!
				</Typography>
				<Typography>
					You open another dialog. Click &quot;Ok&quot; to close it.
				</Typography>
				<Button onClick={() => trigger()}>Ok</Button>
			</Box>
		</Dialog>
	);
};

export default AnotherModal;
