import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Course from '../../../types/Course'

interface CourseCardProps {
	course: Course
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
	let { course } = props

	return (
		<Card sx={{ width: '100%', maxWidth: 300 }}>
			<CardContent>
				<Typography variant='body1'>{course.abbr}</Typography>
				<Typography variant='body2'>{course.title}</Typography>
			</CardContent>
		</Card>
	)
}

export default CourseCard
