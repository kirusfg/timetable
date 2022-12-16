import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
	title: string
	children?: React.ReactNode
}

const PageHeader = (props: PageHeaderProps) => {
	const { title, children } = props

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				padding: 4,
				flex: '0 1 auto',
			}}
		>
			<Stack
				sx={{
					height: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				direction='row'
			>
				<Typography variant='h3'>{title}</Typography>
				{children}
			</Stack>
		</Box>
	)
}

export default PageHeader
