import Box from '@mui/material/Box'

interface PageBodyProps {
	children?: React.ReactNode
}

const PageBody = (props: PageBodyProps) => {
	const { children } = props

	return (
		<Box
			sx={{
				padding: 4,
				flex: '1 1 auto',
				minHeight: 0,
			}}
		>
			{children}
		</Box>
	)
}

export default PageBody
